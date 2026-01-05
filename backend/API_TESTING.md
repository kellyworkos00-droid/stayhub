# API Testing Examples

Test all endpoints using curl or any REST client (Postman, Insomnia, etc.)

Base URL: `http://localhost:3000/api` (replace with your production URL)

---

## 🏠 Properties

### Get All Properties
```bash
curl http://localhost:3000/api/properties
```

### Get Properties with Filters
```bash
# Filter by location
curl "http://localhost:3000/api/properties?location=California"

# Filter by price range
curl "http://localhost:3000/api/properties?minPrice=100&maxPrice=300"

# Filter by guests and property type
curl "http://localhost:3000/api/properties?guests=4&propertyType=Entire%20loft"

# Pagination and sorting
curl "http://localhost:3000/api/properties?page=1&limit=10&sortBy=pricePerNight&order=asc"

# Combine filters
curl "http://localhost:3000/api/properties?location=California&minPrice=200&maxPrice=500&guests=4&page=1&limit=5"
```

### Get Single Property
```bash
curl http://localhost:3000/api/properties/PROPERTY_ID_HERE
```

### Search Properties
```bash
curl "http://localhost:3000/api/properties/search/text?q=beach%20villa"
```

### Create Property
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beautiful Lake House",
    "location": "Lake Tahoe, California",
    "hostName": "Jane Doe",
    "pricePerNight": 275,
    "rating": 4.8,
    "reviewCount": 45,
    "images": [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    "propertyType": "Entire cabin",
    "guests": 6,
    "bedrooms": 3,
    "beds": 4,
    "bathrooms": 2,
    "amenities": ["Wifi", "Kitchen", "Lake view", "Fireplace"],
    "description": "Stunning lake house with private dock.",
    "isSuperhost": false
  }'
```

---

## 📅 Bookings

### Get All Bookings
```bash
curl http://localhost:3000/api/bookings
```

### Get Bookings by User
```bash
curl "http://localhost:3000/api/bookings?userId=USER_ID_HERE"
```

### Get Bookings by Status
```bash
curl "http://localhost:3000/api/bookings?status=upcoming"
```

### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "property": "PROPERTY_ID_HERE",
    "user": "USER_ID_HERE",
    "checkIn": "2026-03-01T00:00:00.000Z",
    "checkOut": "2026-03-05T00:00:00.000Z",
    "guests": 4,
    "totalPrice": 1200,
    "status": "upcoming"
  }'
```

### Update Booking (Cancel)
```bash
curl -X PUT http://localhost:3000/api/bookings/BOOKING_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "status": "cancelled"
  }'
```

---

## ⭐ Reviews

### Get Reviews for Property
```bash
curl http://localhost:3000/api/reviews/property/PROPERTY_ID_HERE
```

### Create Review
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "property": "PROPERTY_ID_HERE",
    "user": "USER_ID_HERE",
    "userName": "John Smith",
    "userAvatar": "https://via.placeholder.com/150",
    "rating": 5,
    "comment": "Amazing place! Highly recommended."
  }'
```

---

## 👤 Users

### Register New User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }'
```

**Response includes JWT token:**
```json
{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

### Get User Profile
```bash
curl http://localhost:3000/api/users/USER_ID_HERE
```

### Update User Profile
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "phone": "+1234567890"
  }'
```

### Add to Favorites
```bash
curl -X POST http://localhost:3000/api/users/USER_ID_HERE/favorites/PROPERTY_ID_HERE
```

### Remove from Favorites
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID_HERE/favorites/PROPERTY_ID_HERE
```

---

## 🏥 Health Check

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "StayHub API is running",
  "timestamp": "2026-01-05T..."
}
```

---

## 📝 Tips

1. **Get IDs**: After seeding, get property/user IDs from GET endpoints
2. **Save Token**: Store JWT token from login/register for authenticated requests
3. **Date Format**: Use ISO 8601 format for dates: `2026-03-01T00:00:00.000Z`
4. **Testing Tools**: Use Postman, Insomnia, or Thunder Client (VS Code extension)

---

## 🔄 Workflow Example

```bash
# 1. Seed database
npm run seed

# 2. Get all properties
curl http://localhost:3000/api/properties

# 3. Register a user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# 4. Copy user._id and property._id from responses

# 5. Create a booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "property": "PROPERTY_ID",
    "user": "USER_ID",
    "checkIn": "2026-03-01T00:00:00.000Z",
    "checkOut": "2026-03-05T00:00:00.000Z",
    "guests": 2,
    "totalPrice": 800
  }'

# 6. Add review
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "property": "PROPERTY_ID",
    "user": "USER_ID",
    "userName": "Test User",
    "rating": 5,
    "comment": "Great place!"
  }'
```
