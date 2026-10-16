# 🚀 Quick Start Guide

## Option 1: Automated Setup (Recommended)

1. **Run the setup script:**
```bash
.\setup.bat
```

This will:
- Install all dependencies
- Create .env.local file
- Show you next steps

2. **Add your Groq API key:**
   - Open `.env.local` in any text editor
   - Replace `your_groq_api_key_here` with your actual key
   - Save the file

3. **Start the app:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

---

## Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment

```bash
# Create .env.local file
copy .env.local.example .env.local

# Edit .env.local and add your Groq API key
notepad .env.local
```

Add this line with your actual key:
```
GROQ_API_KEY=gsk_your_actual_key_here
```

### Step 3: Run Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Navigate to: `http://localhost:3000`

---

## 🔑 Getting Your Groq API Key

1. Go to: https://console.groq.com
2. Sign up or login (it's FREE!)
3. Click on "API Keys" in the sidebar
4. Click "Create API Key"
5. Copy the key
6. Paste it in your `.env.local` file

**Note:** Your previous key was exposed in the chat. Make sure to create a NEW key and keep it secret!

---

## ✅ Verification

If everything works, you should see:

1. ✅ App loads at `localhost:3000`
2. ✅ Three dropdowns appear (Level, Category, Industry)
3. ✅ Click "Generate Project Idea!" button
4. ✅ Bingo animation plays
5. ✅ Project idea appears with detailed roadmap

---

## 🐛 Common Issues

### Issue: "API configuration error"

**Solution:**
- Check that `.env.local` file exists in the project root
- Verify your Groq API key is correct
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
# Then open http://localhost:3001
```

### Issue: "Too many requests"

**Solution:**
- Wait 1 minute (rate limit: 10 requests/minute)
- Or, edit `app/api/generate/route.ts` line 28 to increase limit

---

## 📂 Project Structure Overview

```
randomtopicaiml/
├── app/
│   ├── api/generate/route.ts    ← Groq API integration
│   ├── page.tsx                 ← Main UI
│   └── layout.tsx               ← App layout
├── components/                  ← React components
├── data/ideas.json             ← Static project ideas
├── .env.local                  ← YOUR API KEY (never commit!)
└── package.json                ← Dependencies
```

---

## 🎯 Usage Example

1. **Select "Beginner"** from Level dropdown
2. **Select "Computer Vision"** from Category
3. **Select "Healthcare"** from Industry
4. **Click** "🎲 Generate Project Idea!"
5. **Watch** the bingo animation
6. **Read** your customized project idea with full roadmap
7. **Save** the idea or generate a new one!

---

## 🚀 Ready to Deploy?

Once you've tested locally:

1. Push to GitHub
2. Deploy to Vercel (free!)
3. Add `GROQ_API_KEY` in Vercel environment variables
4. Your app is live! 🎉

See README.md for detailed deployment instructions.

---

## 💡 Tips

- Start with Beginner level to test the app
- Try different combinations to see variety
- The app uses AI when no static idea matches your selection
- All generated ideas are detailed with step-by-step roadmaps
- Save your favorite ideas to localStorage (check browser console)

---

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Review the code comments in the source files
- All components are well-documented

---

**Happy generating! 🤖✨**
