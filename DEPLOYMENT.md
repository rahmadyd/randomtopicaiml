# 🚀 Deployment Guide

## Deploy to Vercel (Recommended - FREE)

Vercel is perfect for Next.js apps and offers generous free tier.

### Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com)
- Your project pushed to GitHub

---

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI/ML Project Idea Generator"

# Create main branch
git branch -M main

# Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/ai-project-ideas.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Via Vercel Website (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Import Git Repository"
4. Select your `ai-project-ideas` repository
5. Vercel will auto-detect it's a Next.js app ✅
6. Click "Environment Variables" section
7. Add variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: `gsk_your_actual_groq_api_key`
8. Click "Deploy"
9. Wait 2-3 minutes ☕
10. Done! Your app is live at `https://your-app.vercel.app` 🎉

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project name? ai-project-ideas
# - In which directory? ./
# - Override settings? No

# Add environment variable
vercel env add GROQ_API_KEY

# Enter your Groq API key when prompted

# Production deployment
vercel --prod
```

---

## Custom Domain (Optional)

### Free Vercel Subdomain

Your app automatically gets:
```
https://ai-project-ideas.vercel.app
```

### Custom Domain

1. Buy domain from Namecheap, GoDaddy, etc. ($10-15/year)
2. Go to Vercel project → Settings → Domains
3. Add your domain: `yourdomain.com`
4. Update DNS records (Vercel shows you what to add)
5. Wait 5-10 minutes for DNS propagation
6. Done! HTTPS is automatic ✅

---

## Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GROQ_API_KEY` | Groq AI API key | [console.groq.com](https://console.groq.com) |

### How to Add on Vercel

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add new variable
4. Click "Save"
5. Redeploy (Vercel → Deployments → ⋯ → Redeploy)

---

## Monitoring & Analytics

### Built-in Vercel Analytics (Free)

1. Go to your project on Vercel
2. Click "Analytics" tab
3. See:
   - Page views
   - Top pages
   - Referrers
   - Devices
   - Countries

### Error Monitoring

Check:
- Vercel → Functions → Logs (API errors)
- Vercel → Analytics → Performance

---

## CI/CD (Automatic Deployments)

Once connected to GitHub, every push automatically deploys:

```bash
# Make changes
git add .
git commit -m "Add new features"
git push

# Vercel automatically:
# 1. Detects the push
# 2. Builds your app
# 3. Deploys to production
# 4. Sends you notification
```

### Preview Deployments

Every pull request gets its own preview URL:
```
https://ai-project-ideas-git-feature-branch.vercel.app
```

---

## Performance Optimization

### Already Included ✅

- Next.js automatic code splitting
- Image optimization
- Edge functions (fast globally)
- Automatic caching
- Gzip compression

### Optional Improvements

1. **Add caching headers** (already in `next.config.ts`)
2. **Optimize images**: Use Next.js `<Image>` component
3. **Add ISR** for static ideas page

---

## Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

**Pros**: Easy, free tier
**Cons**: Next.js serverless functions limited

### Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add `GROQ_API_KEY` environment variable
4. Deploy

**Pros**: Good for backend-heavy apps
**Cons**: Free tier is $5 credit/month (runs out)

### Docker (Self-hosted)

```dockerfile
# Dockerfile already set up for you
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t ai-project-ideas .

# Run
docker run -p 3000:3000 -e GROQ_API_KEY=your_key ai-project-ideas
```

---

## Security Checklist

Before going live:

- ✅ `.gitignore` includes `.env.local`
- ✅ Never commit API keys
- ✅ Use environment variables on Vercel
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Security headers configured
- ✅ Rate limiting enabled
- ✅ Input validation in place

---

## Cost Estimation

### Free Forever Setup

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Vercel | 100GB bandwidth | ~2-5GB/month | $0 |
| Groq | 14,400 req/day | ~100-500/day | $0 |
| GitHub | Unlimited public repos | 1 repo | $0 |
| **Total** | | | **$0/month** |

### If You Scale (1000+ users/day)

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | 1TB bandwidth | $20/month |
| Groq | 100k requests/day | ~$5-10/month |
| **Total** | | **$25-30/month** |

---

## Troubleshooting

### Build Fails on Vercel

**Check:**
1. All dependencies in `package.json`
2. TypeScript errors: run `npm run build` locally
3. Environment variables set correctly

**Fix:**
```bash
# Test build locally first
npm run build
npm run start
```

### API Routes Not Working

**Check:**
1. Environment variable `GROQ_API_KEY` is set on Vercel
2. Go to Vercel → Functions → Logs to see errors
3. API routes are in `app/api/` directory

### Domain Not Working

**Check:**
1. DNS records are correct (A or CNAME)
2. Wait 10-30 minutes for DNS propagation
3. Clear browser cache

---

## Post-Deployment

### Test Your App

1. ✅ Homepage loads
2. ✅ Dropdowns work
3. ✅ Generate button works
4. ✅ Ideas display correctly
5. ✅ Save & share buttons work
6. ✅ Mobile responsive

### Share Your App

```
🚀 I just built an AI/ML Project Idea Generator!

Generate unique project ideas with detailed roadmaps:
https://your-app.vercel.app

Built with Next.js, Groq AI, and lots of ☕
```

---

## Updating Your Deployed App

```bash
# Make changes locally
# Test: npm run dev

# Push to GitHub
git add .
git commit -m "Update: added new features"
git push

# Vercel automatically deploys! ✨
```

---

## Rollback

If something breaks:

1. Go to Vercel → Deployments
2. Find last working deployment
3. Click ⋯ → "Promote to Production"
4. Instant rollback! ✅

---

## Getting Help

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Community Discord](https://vercel.com/discord)

---

**Your app is production-ready! 🎉**

Deploy with confidence—all security, performance, and best practices are already implemented!
