require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProperties = [
  {
    title: 'Luxury Beach Villa with Ocean View',
    location: 'Malibu, California',
    hostName: 'Sarah Johnson',
    pricePerNight: 450,
    rating: 4.95,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=800',
    ],
    propertyType: 'Entire villa',
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    amenities: [
      'Wifi',
      'Kitchen',
      'Pool',
      'Hot tub',
      'Beach access',
      'BBQ grill',
      'Ocean view',
      'Parking',
    ],
    description: 'Experience luxury coastal living in this stunning beachfront villa. Wake up to breathtaking ocean views, enjoy your private pool, and relax in the hot tub as the sun sets over the Pacific.',
    isSuperhost: true,
  },
  {
    title: 'Modern Downtown Loft',
    location: 'New York, NY',
    hostName: 'Michael Chen',
    pricePerNight: 220,
    rating: 4.87,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260066-6bc357c229d4?w=800',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    ],
    propertyType: 'Entire loft',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: [
      'Wifi',
      'Kitchen',
      'Gym',
      'Workspace',
      'City view',
      'Elevator',
      'Air conditioning',
    ],
    description: 'Stylish loft in the heart of Manhattan. Perfect for professionals and tourists alike. Walking distance to subway, restaurants, and major attractions.',
    isSuperhost: true,
  },
  {
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    hostName: 'Emma Wilson',
    pricePerNight: 195,
    rating: 4.92,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      'https://images.unsplash.com/photo-1518732655012-5b447c66fa71?w=800',
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
    ],
    propertyType: 'Entire cabin',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    amenities: [
      'Wifi',
      'Kitchen',
      'Fireplace',
      'Heating',
      'Mountain view',
      'Ski-in/Ski-out',
      'Hot tub',
      'Parking',
    ],
    description: 'Escape to the mountains in this charming cabin. Enjoy world-class skiing, cozy nights by the fireplace, and stunning alpine views.',
    isSuperhost: false,
  },
  {
    title: 'Artistic Studio Apartment',
    location: 'Paris, France',
    hostName: 'Pierre Dubois',
    pricePerNight: 125,
    rating: 4.78,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
    ],
    propertyType: 'Entire apartment',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [
      'Wifi',
      'Kitchen',
      'Workspace',
      'City view',
      'Self check-in',
    ],
    description: 'Charming Parisian studio in the Marais district. Perfect for couples seeking an authentic Paris experience.',
    isSuperhost: false,
  },
  {
    title: 'Tropical Paradise Bungalow',
    location: 'Bali, Indonesia',
    hostName: 'Wayan Putra',
    pricePerNight: 89,
    rating: 4.96,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800',
    ],
    propertyType: 'Entire bungalow',
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: [
      'Wifi',
      'Kitchen',
      'Pool',
      'Garden',
      'Outdoor shower',
      'Parking',
    ],
    description: 'Immerse yourself in Balinese culture in this traditional bungalow surrounded by rice paddies. Includes private pool and tropical garden.',
    isSuperhost: true,
  },
];

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to Neon DB...');
    await prisma.$connect();
    console.log('✅ Connected to Neon DB (PostgreSQL)');

    console.log('🗑️  Clearing existing properties...');
    await prisma.property.deleteMany({});

    console.log('🌱 Seeding properties...');
    const createdProperties = [];
    
    for (const property of sampleProperties) {
      const created = await prisma.property.create({
        data: property
      });
      createdProperties.push(created);
    }

    console.log(`✅ Successfully seeded ${createdProperties.length} properties`);
    console.log('🎉 Database seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

seedDatabase();
