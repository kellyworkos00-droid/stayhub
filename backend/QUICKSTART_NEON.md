# ⚡ Quick Start - Neon DB Backend

Get your StayHub backend running with Neon DB in 5 minutes!

---

## 🎯 Prerequisites

- ✅ Node.js 16+ installed
- ✅ Neon account (free at [console.neon.tech](https://console.neon.tech))

---

## 🚀 5-Minute Setup

### 1️⃣ Create Neon Database (2 minutes)

1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up (free, no credit card)
3. Click "Create a project"
4. Name it: `stayhub`
5. **Copy your connection string** - it looks like:
   ```
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 2️⃣ Configure Backend (1 minute)

1. Open `backend/.env` file
2. Replace the `DATABASE_URL` with your Neon connection string:
   ```env
   DATABASE_URL="postgresql://your-connection-string-here"
   ```
3. Save the file

### 3️⃣ Install & Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies (if not done already)
npm install

# Generate Prisma Client
npm run prisma:generate

# Create database tables
npm run prisma:migrate
# When prompted for name, type: init

# Seed sample data
npm run seed

# Start the server
npm run dev
```

### 4️⃣ Test It! (30 seconds)

Open your browser:
- Health check: http://localhost:3000/api/health
- Get properties: http://localhost:3000/api/properties

**You should see JSON data! 🎉**

---

## 📝 What Just Happened?

1. ✅ Connected to Neon DB (serverless PostgreSQL)
2. ✅ Created all database tables (Property, User, Booking, Review)
3. ✅ Seeded 5 sample properties
4. ✅ Started REST API server on port 3000

---

## 🎨 Optional: View Your Database

Want to see your data in a GUI?

```bash
npm run prisma:studio
```

Opens at http://localhost:5555 - you can view and edit all data visually!

---

## 🌐 Deploy to Production

### Railway (Easiest)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set your Neon connection string
railway variables set DATABASE_URL="your-neon-connection-string"

# Run migrations
railway run npm run prisma:migrate

# Seed data
railway run npm run seed

# Get your URL
railway open
```

**Done!** Your API is live at: `https://your-app.railway.app`

---

## 📚 Full Documentation

- **[NEON_SETUP.md](../NEON_SETUP.md)** - Complete Neon DB guide
- **[README.md](README.md)** - Full API documentation  
- **[API_TESTING.md](API_TESTING.md)** - Test all endpoints
- **[HOSTING_GUIDE.md](../HOSTING_GUIDE.md)** - Deployment options

---

## 🆘 Troubleshooting

### Can't connect to database?
- Check your `.env` file has the correct `DATABASE_URL`
- Ensure your Neon project is active in dashboard

### Prisma Client not found?
```bash
npm run prisma:generate
```

### Tables don't exist?
```bash
npm run prisma:migrate
```

### Need fresh start?
```bash
npx prisma migrate reset
npm run seed
```

---

## 🎯 Next Steps

1. ✅ Backend running locally
2. Test API endpoints (see [API_TESTING.md](API_TESTING.md))
3. Deploy to Railway/Heroku
4. Connect Flutter app
5. Build features!

---

## 💰 Cost

- **Neon DB:** FREE (3 GB storage)
- **Railway/Heroku:** FREE tier available
- **Total:** $0 to start! 🎉

---

**Happy coding!** 🚀
