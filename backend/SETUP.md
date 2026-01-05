# StayHub Backend - Quick Setup

## Prerequisites Check
- ✅ Node.js installed? Run: `node --version` (need v16+)
- ✅ MongoDB installed or MongoDB Atlas account ready

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Environment
The `.env` file is already created. Edit it if needed:
- For local MongoDB: Keep `MONGODB_URI=mongodb://localhost:27017/stayhub`
- For MongoDB Atlas: Replace with your connection string

### Step 3: Start the Server
```bash
# Start MongoDB (if using local)
# Windows: mongod
# Mac/Linux: sudo systemctl start mongodb

# Seed the database with sample data
npm run seed

# Start the server
npm run dev
```

Server will be running at: **http://localhost:3000**

## 🧪 Test the API

Open your browser or use curl:
```
http://localhost:3000/api/health
http://localhost:3000/api/properties
```

## 📖 Full Documentation

- API Documentation: See [README.md](README.md)
- Hosting Guide: See [../HOSTING_GUIDE.md](../HOSTING_GUIDE.md)

## 🎯 Next Steps

1. ✅ Backend running locally
2. Test all endpoints
3. Choose hosting platform from HOSTING_GUIDE.md
4. Deploy to production
5. Update Flutter app with production API URL
