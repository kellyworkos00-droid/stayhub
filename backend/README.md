# StayHub Backend API

Backend REST API for StayHub - an Airbnb clone built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/stayhub
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=*
```

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Seed the database with sample data:**
```bash
npm run seed
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Properties

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties (with filters) |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Create new property |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| GET | `/api/properties/search/text?q=query` | Search properties |

**Query Parameters for GET /api/properties:**
- `location` - Filter by location
- `minPrice` - Minimum price per night
- `maxPrice` - Maximum price per night
- `guests` - Minimum number of guests
- `propertyType` - Filter by property type
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/:id` | Get single booking |
| POST | `/api/bookings` | Create new booking |
| PUT | `/api/bookings/:id` | Update booking |
| DELETE | `/api/bookings/:id` | Delete booking |

**Query Parameters for GET /api/bookings:**
- `userId` - Filter by user ID
- `status` - Filter by status (upcoming/completed/cancelled)

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/property/:propertyId` | Get reviews for property |
| GET | `/api/reviews/:id` | Get single review |
| POST | `/api/reviews` | Create new review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user profile |
| POST | `/api/users/:id/favorites/:propertyId` | Add favorite |
| DELETE | `/api/users/:id/favorites/:propertyId` | Remove favorite |

## 📝 Example Requests

### Get Properties
```bash
curl http://localhost:3000/api/properties?location=California&minPrice=100&maxPrice=500
```

### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "property": "property_id_here",
    "user": "user_id_here",
    "checkIn": "2026-02-01",
    "checkOut": "2026-02-05",
    "guests": 2,
    "totalPrice": 800
  }'
```

### User Registration
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }'
```

## 🗄️ Database Schema

### Property
- title, location, hostName
- pricePerNight, rating, reviewCount
- images[], propertyType
- guests, bedrooms, beds, bathrooms
- amenities[], description
- isSuperhost, availableFrom, availableTo

### Booking
- property (ref), user (ref)
- checkIn, checkOut, guests
- totalPrice, status
- bookingDate

### Review
- property (ref), user (ref)
- userName, userAvatar
- rating, comment, date

### User
- name, email, password
- avatar, phone
- favorites[] (property refs)
- isHost

## 🔒 Security Features
- Password hashing with bcrypt
- JWT authentication
- CORS configuration
- Input validation
- MongoDB injection protection

## 📦 Project Structure
```
backend/
├── models/          # Mongoose schemas
├── routes/          # API routes
├── server.js        # Main server file
├── seed.js          # Database seeding
├── package.json     # Dependencies
└── .env            # Environment variables
```

## 🐛 Troubleshooting

**MongoDB connection error:**
- Make sure MongoDB is running locally or check your Atlas connection string
- Verify MONGODB_URI in .env file

**Port already in use:**
- Change PORT in .env file to a different port

**CORS errors:**
- Update CORS_ORIGIN in .env to match your Flutter app's URL

## 📄 License
MIT
