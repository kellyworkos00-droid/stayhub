# Vercel Deployment Guide for StayHub

Complete guide to deploy StayHub API on Vercel using your GitHub repository.

## ✨ What is Vercel?

Vercel is a serverless platform perfect for deploying:
- ✅ Node.js APIs
- ✅ Next.js apps
- ✅ Full-stack applications

**Perfect for:** Production APIs, fast global deployment, easy GitHub integration

---

## 🚀 Deploy on Vercel (5 Minutes)

### Step 1: Go to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repos

### Step 2: Import Project

1. Click "Add New" → "Project"
2. Select your GitHub repo: `stayhub`
3. Choose "Next.js" or "Other" framework
4. Click "Import"

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add these variables:

```env
DATABASE_URL=your_neon_connection_string_here
JWT_SECRET=your_random_secret_key_here
NODE_ENV=production
CORS_ORIGIN=*
```

**Get DATABASE_URL from Neon Dashboard!**

### Step 4: Deploy

1. Click "Deploy"
2. Wait ~2 minutes
3. Your API is live! 🎉

You'll get a URL like: `https://stayhub.vercel.app/api/health`

---

## 📝 What's in vercel.json?

This file configures Vercel:
- Builds your Node.js backend
- Routes `/api/*` requests to `backend/server.js`
- Sets environment variables

---

## 🌐 API URL After Deployment

Your API will be at:
```
https://your-project.vercel.app/api
```

Update your Flutter app:
```dart
class ApiService {
  static const String baseUrl = 'https://your-project.vercel.app/api';
  
  // Now all endpoints work!
  static Future<List<Property>> getProperties() async {
    final response = await http.get(Uri.parse('$baseUrl/properties'));
    // ...
  }
}
```

---

## 🔄 Deploy Updates

Once connected to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update API"
git push origin main

# Vercel automatically deploys!
```

**No manual deployment needed** - it's automatic with GitHub!

---

## 📊 Monitor Deployments

In Vercel Dashboard:
- View all deployments
- Check logs
- Rollback if needed
- See analytics

---

## ⚡ Performance Benefits

Vercel provides:
- 🚀 Global CDN (fast worldwide)
- 🔄 Auto-scaling
- 📊 Built-in analytics
- 🔒 HTTPS by default
- 🌍 Multi-region deployment

---

## 🆘 Troubleshooting

### Build fails?
- Check vercel.json is in project root
- Ensure backend/server.js exists
- Check all dependencies installed

### API returns 500 error?
- Check environment variables in Vercel Dashboard
- Verify DATABASE_URL is correct
- Check server.js console output in Vercel logs

### Database connection fails?
- Verify Neon project is active
- Check connection string format
- Ensure DATABASE_URL is set in Vercel

---

## 💰 Cost

- **Vercel:** FREE tier includes API hosting
- **Neon:** FREE 3GB database
- **Total:** $0/month! 🎉

---

## 🎯 Complete Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub repo URL copied
- [ ] Vercel account created (via GitHub)
- [ ] Project imported to Vercel
- [ ] Environment variables added:
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET
- [ ] Deploy clicked
- [ ] API is live!
- [ ] Flutter app updated with new API URL
- [ ] All endpoints tested

---

## 📚 Next Steps

1. ✅ Push to GitHub (done!)
2. ✅ Deploy on Vercel
3. Test all API endpoints
4. Update Flutter app with live API URL
5. Test end-to-end
6. Launch! 🚀

---

**Your app is now production-ready!** 🎉
