# 🚀 Neon DB Setup Guide for StayHub

Complete guide to set up and use Neon DB (PostgreSQL) with your StayHub backend.

---

## ✨ What is Neon DB?

**Neon** is a serverless PostgreSQL database platform that offers:
- ⚡ Instant database provisioning
- 💰 **FREE** tier with 3 GB storage
- 🔄 Auto-scaling
- 🌍 Global availability
- 🔌 Branching (like Git for databases)
- ⏱️ Pay only for what you use

**Perfect for:** Development, production apps, startups

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Create Neon Account

1. Go to [console.neon.tech](https://console.neon.tech)
2. Sign up with GitHub, Google, or email
3. **It's FREE** - no credit card required!

### Step 2: Create a Project

1. Click **"Create a project"**
2. Project name: `stayhub` (or any name)
3. PostgreSQL version: **16** (recommended)
4. Region: Choose closest to you
5. Click **"Create project"**

### Step 3: Get Connection String

1. Your project dashboard will show a connection string
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Save it for the next step!

---

## 🔧 Backend Setup

### 1. Update Environment Variables

Edit your `.env` file in the `backend` folder:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/stayhub?sslmode=require"
```

**Replace with your actual connection string from Neon!**

### 2. Install Dependencies

```bash
cd backend
npm install
```

This will install Prisma and @prisma/client.

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Create Database Tables

```bash
npm run prisma:migrate
```

When prompted for migration name, type: `init`

### 5. Seed Sample Data

```bash
npm run seed
```

### 6. Start the Server

```bash
npm run dev
```

**Done!** 🎉 Your API is running with Neon DB!

Test it: `http://localhost:3000/api/health`

---

## 📝 Available NPM Scripts

```bash
# Development
npm run dev                  # Start server with nodemon
npm start                    # Start server (production)

# Prisma/Database
npm run prisma:generate      # Generate Prisma Client
npm run prisma:migrate       # Run database migrations
npm run prisma:studio        # Open Prisma Studio (database GUI)

# Data
npm run seed                 # Seed database with sample data
```

---

## 🎨 Prisma Studio (Database GUI)

View and edit your database with a visual interface:

```bash
npm run prisma:studio
```

Opens at: `http://localhost:5555`

You can:
- View all tables
- Edit data directly
- Add/delete records
- Run queries

---

## 🗄️ Database Schema

Your database includes these tables:

**Property**
- id, title, location, hostName
- pricePerNight, rating, reviewCount
- images[], amenities[]
- propertyType, guests, bedrooms, beds, bathrooms
- description, isSuperhost
- availableFrom, availableTo

**User**
- id, name, email, password (hashed)
- avatar, phone, isHost
- favorites[] (property IDs)

**Booking**
- id, propertyId, userId
- checkIn, checkOut, guests
- totalPrice, status
- bookingDate

**Review**
- id, propertyId, userId
- userName, userAvatar
- rating, comment, date

---

## 🔄 Making Database Changes

### Add a New Field to a Model

1. Edit `prisma/schema.prisma`:
   ```prisma
   model Property {
     // ... existing fields ...
     featured Boolean @default(false)  // NEW FIELD
   }
   ```

2. Create and apply migration:
   ```bash
   npm run prisma:migrate
   ```

3. Regenerate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

### Reset Database (Clear All Data)

```bash
npx prisma migrate reset
npm run seed
```

---

## 🌐 Deploying with Neon

### Option 1: Railway

```bash
railway login
railway init
railway up

# Set environment variable
railway variables set DATABASE_URL="your_neon_connection_string"

# Run migrations
railway run npm run prisma:migrate

# Seed data
railway run npm run seed
```

### Option 2: Heroku

```bash
heroku create stayhub-api
heroku config:set DATABASE_URL="your_neon_connection_string"
heroku config:set JWT_SECRET="your_secret"

git push heroku main

# Run migrations
heroku run npm run prisma:migrate

# Seed data
heroku run npm run seed
```

### Option 3: Render

1. Create Web Service on Render
2. Add environment variable:
   - `DATABASE_URL` = your Neon connection string
3. Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Start command: `node server.js`

---

## 🎯 Neon Free Tier Limits

- **Storage:** 3 GB
- **Compute:** 300 hours/month
- **Data transfer:** Unlimited
- **Projects:** Unlimited
- **Branches:** 10 per project

Perfect for:
- Development & testing
- Small to medium apps
- MVP/Prototype
- Side projects

**When to upgrade?**
- Need more than 3GB storage
- High traffic production app
- Need advanced features

---

## 🔐 Security Best Practices

### 1. Secure Your Connection String

**Never commit `.env` file to Git!**

```bash
# Already in .gitignore
.env
```

### 2. Use Environment Variables

```javascript
// ✅ Good
const connectionString = process.env.DATABASE_URL;

// ❌ Bad - Never hardcode!
const connectionString = "postgresql://user:pass@...";
```

### 3. Rotate Database Passwords

In Neon dashboard:
1. Go to Settings
2. Reset password
3. Update your `.env` file

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Check your connection string
- Ensure internet connection
- Verify Neon project is active

### Error: "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### Error: "Table does not exist"

**Solution:**
```bash
npm run prisma:migrate
```

### Seed script fails

**Solution:**
```bash
# Reset and try again
npx prisma migrate reset
npm run seed
```

### Connection timeout

**Solution:**
- Check Neon dashboard - project might be suspended (free tier goes to sleep after inactivity)
- Visit your Neon dashboard to wake it up
- Or enable "Always-on" compute (paid feature)

---

## 📊 Monitoring Your Database

### In Neon Dashboard:

1. **Monitoring tab** shows:
   - Database connections
   - Query performance
   - Storage usage
   - Compute time

2. **Branches tab**:
   - Create database branches for testing
   - Like Git branches, but for your database!

3. **Operations tab**:
   - View all migrations
   - Track schema changes

---

## 💡 Pro Tips

### 1. Use Database Branching

Create a branch for development:
```bash
# In Neon dashboard, create branch "dev"
# Get new connection string for dev branch
# Use different DATABASE_URL for dev/prod
```

### 2. Backup Your Data

Neon automatically backs up your data, but you can also:

```bash
# Export all data
npx prisma db pull
```

### 3. Optimize Queries

Use Prisma's query optimization:
```javascript
// Include only what you need
const properties = await prisma.property.findMany({
  select: {
    id: true,
    title: true,
    pricePerNight: true
    // Don't load everything!
  }
});
```

### 4. Use Prisma Studio for Debugging

```bash
npm run prisma:studio
```
- Quickly view data
- Test relationships
- Debug issues

---

## 🔄 Migration Workflow

### Development:

```bash
# 1. Make schema changes in schema.prisma
# 2. Create migration
npm run prisma:migrate

# 3. Name your migration (e.g., "add-featured-field")
```

### Production:

```bash
# Deploy migrations only (no prompts)
npx prisma migrate deploy
```

---

## 🚀 Performance Tips

1. **Use Indexes** (already included in schema):
   ```prisma
   @@index([location])
   @@index([pricePerNight])
   ```

2. **Connection Pooling** (automatic with Neon)

3. **Query Optimization**:
   ```javascript
   // ❌ Bad - N+1 query problem
   for (const booking of bookings) {
     const property = await prisma.property.findUnique({
       where: { id: booking.propertyId }
     });
   }

   // ✅ Good - Use include
   const bookings = await prisma.booking.findMany({
     include: { property: true }
   });
   ```

---

## 📚 Useful Prisma Commands

```bash
# View database in browser
npx prisma studio

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Pull schema from existing database
npx prisma db pull

# Push schema without migrations (dev only)
npx prisma db push

# Reset database
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

---

## 🆚 Neon vs MongoDB Atlas

| Feature | Neon (PostgreSQL) | MongoDB Atlas |
|---------|-------------------|---------------|
| **Type** | SQL (Relational) | NoSQL (Document) |
| **Free Tier** | 3 GB | 512 MB |
| **Query Language** | SQL (via Prisma) | MongoDB Query |
| **Relationships** | Native JOINs | Manual refs |
| **Scaling** | Vertical + Serverless | Horizontal sharding |
| **Best For** | Structured data, complex queries | Flexible schemas, rapid dev |

**Both are great!** We chose Neon for:
- Larger free tier
- Better relationships (users, bookings, properties)
- SQL advantages for this use case

---

## 🎉 You're All Set!

Your backend now uses:
- ✅ Neon DB (PostgreSQL)
- ✅ Prisma ORM
- ✅ Modern serverless database
- ✅ 3 GB free storage

**Next steps:**
1. Test all API endpoints
2. Deploy to Railway/Heroku
3. Connect your Flutter app
4. Build awesome features!

---

## 📖 Learn More

- [Neon Docs](https://neon.tech/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)

---

Need help? Check the troubleshooting section or visit [Neon Discord](https://discord.gg/neon)!
