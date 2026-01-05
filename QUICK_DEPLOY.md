# 🚀 Deploy StayHub on Vercel - 5 Minutes

Your app is on GitHub! Now deploy it on Vercel with this quick guide.

---

## ⚡ What You Need (Before Starting)

1. **GitHub Account** - You already have this! ✓
2. **Neon DB Connection String** - Get from [console.neon.tech](https://console.neon.tech)
3. **A secret key** - Can be any random string

---

## 📋 Get Your Connection String

1. Visit [console.neon.tech](https://console.neon.tech)
2. Login to your project
3. Find your connection string (looks like):
   ```
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copy it!** You'll need it in 1 minute

---

## 🎯 Deploy on Vercel (5 Steps)

### 1. Visit Vercel
Go to [vercel.com](https://vercel.com)

### 2. Sign In with GitHub
Click "Sign up with GitHub" → Authorize

### 3. Import Your Repository
- Click "Add New" → "Project"
- Find and select `stayhub`
- Click "Import"

### 4. Configure Environment Variables
Add these 4 variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_SECRET` | Any random string (e.g., `abc123xyz789`) |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `*` |

**Paste each value exactly!**

### 5. Deploy
Click "Deploy" button → Wait 2-3 minutes → Done! ✅

---

## 🌐 You Have Your API URL!

After deployment, you'll see:
```
✓ Production: https://your-project.vercel.app
```

Your API is at:
```
https://your-project.vercel.app/api
```

Test it:
```
https://your-project.vercel.app/api/health
```

---

## 📱 Update Your Flutter App

Edit your Flutter code:

**File:** `lib/services/data_service.dart` (or wherever your API URL is)

**Change from:**
```dart
static const String baseUrl = 'http://localhost:3000/api';
```

**Change to:**
```dart
static const String baseUrl = 'https://your-project.vercel.app/api';
```

**Save and rebuild your app!**

---

## ✅ Test Your API

Make a test request:

```bash
curl https://your-project.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "StayHub API is running with Neon DB",
  "timestamp": "2026-01-05T...",
  "database": "PostgreSQL (Neon)"
}
```

---

## 🔄 Update Your Code Later

Push changes anytime:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Vercel automatically redeploys!** No manual steps needed.

---

## 🆘 Common Issues

### "Build failed"
- Check that `backend/server.js` exists
- Verify all dependencies are in `package.json`
- Check Vercel logs for details

### "Database connection error"
- Verify `DATABASE_URL` is correct in Vercel
- Make sure Neon project is active
- Check connection string format

### "API returns 500"
- Check environment variables in Vercel
- Review logs in Vercel Dashboard
- Verify server.js can connect to Neon

---

## 🎉 You're Live!

Your production API is running globally on Vercel!

**Key features:**
- ⚡ Lightning-fast responses
- 🌍 Available worldwide
- 🔄 Auto-scales with traffic
- 🔒 Free HTTPS
- 📊 Built-in analytics

---

## 📚 Full Documentation

- [DEPLOYMENT_COMPLETE.md](DEPLOYMENT_COMPLETE.md) - Overview
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed guide
- [backend/README.md](backend/README.md) - API docs

---

## 🚀 Next Steps

1. ✅ Deploy on Vercel (done!)
2. Get your API URL
3. Update Flutter app with new URL
4. Test end-to-end
5. Celebrate! 🎊

---

Happy deploying! 🚀
