const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

// GET all properties with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      location, 
      minPrice, 
      maxPrice, 
      guests, 
      propertyType,
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const where = {};
    
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice);
    }
    
    if (guests) {
      where.guests = { gte: parseInt(guests) };
    }
    
    if (propertyType) {
      where.propertyType = propertyType;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Sorting
    const orderBy = { [sortBy]: order };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take
      }),
      prisma.property.count({ where })
    ]);

    res.json({
      properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        reviews: {
          orderBy: { date: 'desc' },
          take: 10
        }
      }
    });
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new property
router.post('/', async (req, res) => {
  try {
    const property = await prisma.property.create({
      data: req.body
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update property
router.put('/:id', async (req, res) => {
  try {
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    res.json(property);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE property
router.delete('/:id', async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id }
    });
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// GET search properties
router.get('/search/text', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const properties = await prisma.property.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      }
    });

    res.json({ properties });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
