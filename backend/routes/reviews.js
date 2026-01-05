const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all reviews for a property
router.get('/property/:propertyId', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { propertyId: req.params.propertyId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        property: true
      }
    });
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new review
router.post('/', async (req, res) => {
  try {
    const { propertyId, userId, userName, userAvatar, rating, comment } = req.body;

    const review = await prisma.review.create({
      data: {
        propertyId,
        userId,
        userName,
        userAvatar: userAvatar || 'https://via.placeholder.com/150',
        rating: parseFloat(rating),
        comment
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        property: true
      }
    });

    // Update property rating
    const reviews = await prisma.review.findMany({
      where: { propertyId }
    });
    
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        rating: Math.round(avgRating * 100) / 100,
        reviewCount: reviews.length
      }
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update review
router.put('/:id', async (req, res) => {
  try {
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        property: true
      }
    });

    // Recalculate property rating
    const reviews = await prisma.review.findMany({
      where: { propertyId: review.propertyId }
    });
    
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await prisma.property.update({
      where: { id: review.propertyId },
      data: {
        rating: Math.round(avgRating * 100) / 100
      }
    });
    
    res.json(review);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    const review = await prisma.review.delete({
      where: { id: req.params.id }
    });

    // Recalculate property rating
    const reviews = await prisma.review.findMany({
      where: { propertyId: review.propertyId }
    });
    
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;
    
    await prisma.property.update({
      where: { id: review.propertyId },
      data: {
        rating: Math.round(avgRating * 100) / 100,
        reviewCount: reviews.length
      }
    });
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
