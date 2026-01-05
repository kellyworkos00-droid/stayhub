const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all bookings (with optional user filter)
router.get('/', async (req, res) => {
  try {
    const { userId, status } = req.query;
    const where = {};
    
    if (userId) where.userId = userId;
    if (status) where.status = status.toUpperCase();

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      },
      orderBy: { bookingDate: 'desc' }
    });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new booking
router.post('/', async (req, res) => {
  try {
    const { propertyId, userId, checkIn, checkOut, guests, totalPrice, status } = req.body;

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { not: 'CANCELLED' },
        OR: [
          {
            AND: [
              { checkIn: { lte: new Date(checkIn) } },
              { checkOut: { gte: new Date(checkIn) } }
            ]
          },
          {
            AND: [
              { checkIn: { lte: new Date(checkOut) } },
              { checkOut: { gte: new Date(checkOut) } }
            ]
          },
          {
            AND: [
              { checkIn: { gte: new Date(checkIn) } },
              { checkOut: { lte: new Date(checkOut) } }
            ]
          }
        ]
      }
    });

    if (overlappingBooking) {
      return res.status(400).json({ 
        error: 'Property is not available for the selected dates' 
      });
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId,
        userId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
        totalPrice: parseFloat(totalPrice),
        status: status ? status.toUpperCase() : 'UPCOMING'
      },
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update booking
router.put('/:id', async (req, res) => {
  try {
    const { status, ...otherData } = req.body;
    const updateData = { ...otherData };
    
    if (status) {
      updateData.status = status.toUpperCase();
    }

    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        property: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      }
    });
    
    res.json(booking);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    await prisma.booking.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
