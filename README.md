# 🤖 AI/ML Project Idea Generator

Generate unique, detailed AI and Machine Learning project ideas tailored to your skill level, interests, and industry focus.

## ✨ Features

- **🎯 Smart Filtering**: Select level (Beginner/Intermediate/Advanced), AI/ML category, and industry
- **🎰 Bingo Animation**: Fun slot-machine style idea generation
- **🔒 Secure**: Full security implementation (rate limiting, input validation, sanitization)
- **⚡ Fast**: Powered by Groq AI (Llama 3.1 70B) for instant generation
- **📊 Detailed Roadmaps**: Step-by-step implementation guides based on your level
- **💾 Save & Share**: Bookmark favorite ideas and share with others
- **🌓 Dark Mode**: Beautiful UI with light/dark theme support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone and install dependencies:**

```bash
cd randomtopicaiml
npm install
```

2. **Setup environment variables:**

```bash
# Copy example env file
copy .env.local.example .env.local

# Edit .env.local and add your Groq API key:
GROQ_API_KEY=your_actual_groq_api_key_here
```

3. **Run development server:**

```bash
npm run dev
```

4. **Open in browser:**

```
http://localhost:3000
```

## 🔑 Getting Your Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up/login (free)
3. Navigate to API Keys section
4. Create new key
5. Copy and paste into `.env.local`

**Free Tier Limits:**
- 30 requests/minute
- 14,400 requests/day
- More than enough for this app!

## 🏗️ Project Structure

```
randomtopicaiml/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Secure API endpoint with Groq
│   ├── page.tsx                   # Main application page
│   ├── layout.tsx                 # Root layout with metadata
│   └── globals.css                # Global styles
├── components/
│   ├── DropdownSelectors.tsx      # Level, category, industry dropdowns
│   ├── BingoAnimation.tsx         # Slot machine animation
│   ├── IdeaCard.tsx              # Generated idea display
│   └── DetailedRoadmap.tsx        # Step-by-step roadmap
├── data/
│   └── ideas.json                 # Static fallback ideas (expandable)
├── types/
│   └── index.ts                   # TypeScript interfaces
├── .env.local.example             # Environment template
└── next.config.ts                 # Security headers & config
```

## 🛡️ Security Features

### Internal Security
- ✅ API key protection (server-side only, never exposed)
- ✅ Rate limiting (10 requests/minute per IP)
- ✅ Input validation with Zod schema
- ✅ Error handling (no internal info leakage)
- ✅ Request logging with unique IDs

### External Security
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ HTTPS enforcement
- ✅ XSS protection (React auto-escaping)
- ✅ CORS configuration
- ✅ Environment variable safety

## 📊 How It Works

### Hybrid Approach (Static + AI)

1. **User selects preferences** (level, category, industry)
2. **System checks static database** for matching ideas
   - If found → Instant return (< 100ms)
   - If not found → Generate with Groq AI (1-2 seconds)
3. **AI generates** detailed project with roadmap
4. **Results cached** for future requests

### Categories Supported

**AI/ML Categories:**
- Computer Vision
- Natural Language Processing
- Time Series Forecasting
- Recommendation Systems
- Reinforcement Learning
- Generative AI
- Anomaly Detection
- Speech Processing

**Industries:**
- Healthcare
- Finance & Trading
- E-commerce & Retail
- Education & E-learning
- Social Media
- Gaming & Entertainment
- Agriculture
- Transportation

**Levels:**
- Beginner (2-3 weeks)
- Intermediate (3-6 weeks)
- Advanced (6+ weeks)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ai-project-ideas.git
git push -u origin main
```

2. **Deploy to Vercel:**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add environment variable: `GROQ_API_KEY`
- Click "Deploy"

Done! Your app is live at `your-app.vercel.app` 🎉

### Free Tier Resources

- **Vercel**: 100GB bandwidth, 100 deployments/day
- **Groq**: 14,400 requests/day free
- **Total cost**: $0/month 💰

## 🎨 Customization

### Add More Static Ideas

Edit `data/ideas.json` and add more project objects:

```json
{
  "id": "unique-id",
  "title": "Your Project Title",
  "description": "Description...",
  "level": "beginner",
  "category": "computer-vision",
  "industry": "healthcare",
  ...
}
```

### Modify UI Colors

Edit `tailwind.config.ts` and customize theme colors.

### Change AI Model

Edit `app/api/generate/route.ts` line 127:

```typescript
model: 'mixtral-8x7b-32768', // Alternative: faster, but less detailed
```

## 📝 Development Scripts

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### "API configuration error"
- Check `.env.local` file exists
- Verify `GROQ_API_KEY` is set correctly
- Restart dev server after changing env vars

### "Too many requests"
- Wait 1 minute before trying again
- Rate limit: 10 requests/minute per IP

### Build errors
- Delete `.next` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 License

MIT License - feel free to use for personal or commercial projects!

## 🙏 Credits

- **Built with**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **AI Provider**: Groq (Llama 3.1 70B Versatile)
- **Deployment**: Vercel

## 🤝 Contributing

Pull requests welcome! Please:
1. Fork the repo
2. Create feature branch
3. Add your changes
4. Submit PR

---

**Made with ❤️ for the AI/ML community**

Happy coding! 🚀
