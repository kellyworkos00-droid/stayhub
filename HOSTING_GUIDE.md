# 🚀 StayHub Backend - Hosting Guide

Complete guide to host your StayHub backend API on various platforms.

---

## 📋 Table of Contents
1. [Heroku (Easiest - Free Tier Available)](#1-heroku)
2. [Railway (Modern & Easy - Free Tier)](#2-railway)
3. [Render (Simple - Free Tier)](#3-render)
4. [DigitalOcean App Platform](#4-digitalocean-app-platform)
5. [AWS EC2 (Advanced)](#5-aws-ec2)
6. [Vercel (Serverless)](#6-vercel)

---

## 1. Heroku (Easiest - Recommended for Beginners)

### Prerequisites
- Heroku account (heroku.com)
- Heroku CLI installed

### Steps

**1. Install Heroku CLI:**
```bash
# Windows (using chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

**2. Login to Heroku:**
```bash
heroku login
```

**3. Create Procfile in backend folder:**
```bash
echo "web: node server.js" > Procfile
```

**4. Initialize Git (if not already):**
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
```

**5. Create Heroku App:**
```bash
heroku create stayhub-api
```

**6. Add MongoDB Atlas (Free):**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Add to Heroku:

```bash
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/stayhub"
heroku config:set JWT_SECRET="your_secret_key_here"
heroku config:set NODE_ENV="production"
```

**7. Deploy:**
```bash
git push heroku main
```

**8. Seed Database:**
```bash
heroku run npm run seed
```

**9. Open App:**
```bash
heroku open
```

Your API will be at: `https://stayhub-api.herokuapp.com/api/health`

---

## 2. Railway (Modern & Easy - Recommended)

### Steps

**1. Sign up at [Railway.app](https://railway.app/)**

**2. Install Railway CLI:**
```bash
npm install -g @railway/cli
```

**3. Login:**
```bash
railway login
```

**4. Initialize Project:**
```bash
cd backend
railway init
```

**5. Add MongoDB:**
- In Railway dashboard, click "+ New"
- Select "Database" → "MongoDB"
- Copy connection string

**6. Set Environment Variables:**
```bash
railway variables set MONGODB_URI="your_mongodb_connection_string"
railway variables set JWT_SECRET="your_secret_key"
railway variables set PORT=3000
```

**7. Deploy:**
```bash
railway up
```

**8. Get URL:**
```bash
railway open
```

Your API will be live at the provided Railway URL!

---

## 3. Render (Simple & Free)

### Steps

**1. Sign up at [Render.com](https://render.com/)**

**2. Create New Web Service:**
- Click "New +" → "Web Service"
- Connect your GitHub repo (push backend code to GitHub first)
- Or use "Public Git repository"

**3. Configure:**
```
Name: stayhub-api
Environment: Node
Build Command: npm install
Start Command: node server.js
```

**4. Add Environment Variables:**
```
MONGODB_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_secret_key
NODE_ENV = production
```

**5. Create MongoDB:**
- In Render dashboard, create new MongoDB instance (paid)
- Or use MongoDB Atlas (free)

**6. Deploy:**
- Click "Create Web Service"
- Render will automatically deploy

Your API will be at: `https://stayhub-api.onrender.com`

---

## 4. DigitalOcean App Platform

### Steps

**1. Sign up at [DigitalOcean](https://www.digitalocean.com/)**

**2. Create App:**
- Apps → Create App
- Connect GitHub repository
- Select backend folder

**3. Configure:**
```
Name: stayhub-api
Type: Web Service
Environment: Node.js
Build Command: npm install
Run Command: node server.js
```

**4. Add MongoDB:**
- Create managed MongoDB database in DO
- Or use MongoDB Atlas

**5. Environment Variables:**
```
MONGODB_URI = your_connection_string
JWT_SECRET = your_secret_key
PORT = 8080
```

**6. Deploy:**
- Click "Create Resources"

Cost: Starts at $5/month

---

## 5. AWS EC2 (Advanced - Full Control)

### Steps

**1. Launch EC2 Instance:**
- Go to AWS Console → EC2
- Launch Ubuntu Server instance
- Configure security group (open port 3000)

**2. Connect via SSH:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**3. Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

**4. Install MongoDB:**
```bash
# Or use MongoDB Atlas
sudo apt install mongodb-server
```

**5. Upload Code:**
```bash
# On local machine
scp -i your-key.pem -r backend ubuntu@your-ec2-ip:~/
```

**6. Setup Application:**
```bash
cd backend
npm install
cp .env.example .env
nano .env  # Edit with your settings
```

**7. Run with PM2:**
```bash
pm2 start server.js --name stayhub-api
pm2 startup
pm2 save
```

**8. Setup Nginx (Optional):**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/stayhub

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

sudo ln -s /etc/nginx/sites-available/stayhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Your API will be at: `http://your-ec2-ip:3000`

---

## 6. Vercel (Serverless - Not Ideal for Express)

Vercel is primarily for frontend, but can host Express APIs with some configuration.

**Note:** For better results with serverless, consider converting to Vercel's API routes or using Netlify Functions.

### Steps

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Create vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**3. Deploy:**
```bash
cd backend
vercel
```

**Warning:** Serverless has limitations for persistent connections. Use MongoDB Atlas.

---

## 🗄️ Database Hosting Options

### MongoDB Atlas (Recommended - Free Tier)

**1. Create Account:**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for free

**2. Create Cluster:**
- Choose free tier (M0)
- Select region closest to your API host

**3. Setup:**
- Create database user
- Whitelist IP (use 0.0.0.0/0 for all IPs)
- Get connection string

**4. Connection String Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stayhub?retryWrites=true&w=majority
```

### Other Database Options:
- **Railway MongoDB** - $5/month
- **Render MongoDB** - $7/month  
- **DigitalOcean Managed MongoDB** - $15/month
- **AWS DocumentDB** - Enterprise

---

## ⚡ Quick Comparison

| Platform | Ease | Cost | Best For |
|----------|------|------|----------|
| **Railway** | ⭐⭐⭐⭐⭐ | Free tier → $5/mo | Beginners, Quick deploy |
| **Heroku** | ⭐⭐⭐⭐⭐ | Free tier → $7/mo | Traditional deployment |
| **Render** | ⭐⭐⭐⭐ | Free tier → $7/mo | Simple apps |
| **DigitalOcean** | ⭐⭐⭐ | $5/mo+ | Growing apps |
| **AWS EC2** | ⭐⭐ | $5-20/mo | Full control |
| **Vercel** | ⭐⭐⭐ | Free tier | Frontend-focused |

---

## 🎯 Recommended Stack for Beginners

**API Hosting:** Railway or Heroku  
**Database:** MongoDB Atlas (Free Tier)  
**Total Cost:** $0 - $5/month

### Quick Start with Railway:
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and deploy
cd backend
railway login
railway init
railway up

# 3. Add MongoDB Atlas connection string
railway variables set MONGODB_URI="your_atlas_string"
railway variables set JWT_SECRET="random_secret_key"

# 4. Done! Your API is live
railway open
```

---

## 🔧 Environment Variables Needed

For any platform, you'll need:

```env
PORT=3000                          # Port (some platforms auto-set this)
NODE_ENV=production                # Environment
MONGODB_URI=mongodb+srv://...      # MongoDB connection string
JWT_SECRET=your_secret_key_here    # JWT secret (generate random)
CORS_ORIGIN=*                      # Or your Flutter app URL
```

---

## 📱 Connecting Flutter App to Backend

Once deployed, update your Flutter app:

```dart
// lib/services/api_service.dart
class ApiService {
  static const String baseUrl = 'https://your-api-url.com/api';
  
  // Example: https://stayhub-api.railway.app/api
  // Example: https://stayhub-api.herokuapp.com/api
}
```

---

## ✅ Testing Your Deployment

```bash
# Test health endpoint
curl https://your-api-url.com/api/health

# Test get properties
curl https://your-api-url.com/api/properties

# Test with query params
curl "https://your-api-url.com/api/properties?location=California&limit=5"
```

---

## 🆘 Troubleshooting

**API not starting:**
- Check logs on platform dashboard
- Verify environment variables are set
- Ensure MongoDB connection string is correct

**Database connection failed:**
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas
- Check connection string format
- Verify username/password

**CORS errors in Flutter:**
- Update CORS_ORIGIN environment variable
- Or keep as `*` for development

---

## 📚 Next Steps

1. ✅ Deploy backend to chosen platform
2. ✅ Setup MongoDB Atlas
3. ✅ Run seed script to populate data
4. ✅ Test all API endpoints
5. ✅ Update Flutter app with API URL
6. 🚀 Launch your app!

---

Need help? Check platform-specific documentation:
- [Railway Docs](https://docs.railway.app/)
- [Heroku Docs](https://devcenter.heroku.com/)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
