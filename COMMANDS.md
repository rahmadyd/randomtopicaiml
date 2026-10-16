# ⚡ Quick Command Reference

Cheat sheet untuk semua command yang sering dipakai.

---

## 🚀 Setup & Installation

```bash
# Masuk ke folder project
cd f:\webproject\randomtopicaiml

# Install dependencies (pertama kali)
npm install

# Atau pakai setup script
.\setup.bat

# Verify installation
npm list next react
```

---

## 🏃 Running App

```bash
# Start development server
npm run dev

# Start di port lain
npm run dev -- -p 3001

# Build untuk production
npm run build

# Run production build local
npm start

# Stop server
Ctrl + C
```

---

## 🔧 Development

```bash
# Lint code
npm run lint

# Fix lint errors
npm run lint -- --fix

# Type check
npx tsc --noEmit

# Clear cache & rebuild
Remove-Item -Recurse -Force .next
npm run dev
```

---

## 📦 Dependencies

```bash
# Install new package
npm install package-name

# Install dev dependency
npm install -D package-name

# Update all packages
npm update

# Check outdated
npm outdated

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🔍 Debugging

```bash
# View logs real-time
npm run dev
# Check terminal output

# Check specific package version
npm list package-name

# Clear npm cache
npm cache clean --force

# Reinstall everything
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📁 File Operations

```bash
# List files
ls

# List with details
ls -la

# Show file content
cat filename.txt

# Search in files
Select-String -Path "**/*.ts" -Pattern "searchterm"

# Create directory
New-Item -ItemType Directory -Path "newfolder"

# Copy file
Copy-Item source.txt destination.txt

# Delete file
Remove-Item filename.txt

# Delete folder
Remove-Item -Recurse -Force foldername
```

---

## 🌐 Git Commands

```bash
# Initialize git
git init

# Check status
git status

# Add all files
git add .

# Add specific file
git add filename.txt

# Commit
git commit -m "Your message"

# View commit history
git log --oneline

# Create branch
git branch branch-name

# Switch branch
git checkout branch-name

# Push to GitHub
git push origin main

# Pull latest
git pull
```

---

## 🔑 Environment Variables

```bash
# Create .env.local
Copy-Item .env.local.example .env.local

# Edit with notepad
notepad .env.local

# Edit with VS Code
code .env.local

# View content (be careful!)
cat .env.local

# Check if file exists
Test-Path .env.local
```

---

## 🧪 Testing Commands

```bash
# Test API endpoint
curl -X POST http://localhost:3000/api/generate `
  -H "Content-Type: application/json" `
  -d '{"level":"beginner","category":"computer-vision","industry":"healthcare"}'

# Or use Invoke-WebRequest
Invoke-WebRequest -Uri http://localhost:3000/api/generate `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"level":"beginner","category":"computer-vision","industry":"healthcare"}'

# Check port usage
netstat -ano | findstr :3000

# Kill process on port
taskkill /PID [PID_NUMBER] /F
```

---

## 📊 Monitoring

```bash
# Watch file changes
npm run dev
# Auto-reload on file save

# Check bundle size
npm run build
# Look for "First Load JS"

# Analyze bundle
npm install -g @next/bundle-analyzer
```

---

## 🚀 Deployment

```bash
# Build production
npm run build

# Test production locally
npm start

# Deploy to Vercel (CLI)
npm install -g vercel
vercel login
vercel
vercel --prod

# Or just push to GitHub
git push
# Vercel auto-deploys!
```

---

## 🔒 Security

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may break things)
npm audit fix --force

# Check for updates
npm outdated

# Update specific package
npm update package-name
```

---

## 🗑️ Cleanup

```bash
# Remove node_modules
Remove-Item -Recurse -Force node_modules

# Remove build files
Remove-Item -Recurse -Force .next

# Remove lock file
Remove-Item package-lock.json

# Full cleanup & reinstall
Remove-Item -Recurse -Force node_modules, .next, package-lock.json
npm install
```

---

## 💾 Backup & Restore

```bash
# Backup project (without node_modules)
Compress-Archive -Path * -DestinationPath backup.zip -Exclude node_modules,.next

# List what's in project
ls -Recurse | Select-Object FullName

# Count lines of code
(Get-ChildItem -Recurse -Filter "*.tsx","*.ts" | Get-Content | Measure-Object -Line).Lines
```

---

## 🔍 Find & Search

```bash
# Find files by name
Get-ChildItem -Recurse -Filter "*.json"

# Search text in files
Select-String -Path "**/*.ts" -Pattern "GROQ_API_KEY"

# Count files
(Get-ChildItem -Recurse -File).Count

# Size of folder
(Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
```

---

## 🎨 Code Quality

```bash
# Format code (if prettier installed)
npx prettier --write .

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Lint specific file
npx eslint app/page.tsx
```

---

## 📱 Browser Testing

```bash
# Open in default browser
Start-Process "http://localhost:3000"

# Open in specific browser
Start-Process chrome "http://localhost:3000"
Start-Process firefox "http://localhost:3000"
Start-Process msedge "http://localhost:3000"
```

---

## 🆘 Emergency Commands

```bash
# Kill all node processes (nuclear option)
taskkill /IM node.exe /F

# Clear everything and start fresh
Remove-Item -Recurse -Force node_modules, .next, package-lock.json, .env.local
Copy-Item .env.local.example .env.local
npm install
npm run dev

# Reset git (careful!)
git reset --hard HEAD
git clean -fd
```

---

## 📝 Quick Checks

```bash
# Check if server is running
curl http://localhost:3000

# Check Node/npm versions
node --version
npm --version

# Check what's using port 3000
netstat -ano | findstr :3000

# Check if .env.local exists
Test-Path .env.local

# Check package.json
cat package.json
```

---

## 🎯 Most Used Commands (Top 10)

```bash
1. npm run dev              # Start development
2. Ctrl + C                 # Stop server
3. npm install              # Install dependencies
4. git add .                # Stage changes
5. git commit -m "msg"      # Commit
6. git push                 # Push to GitHub
7. npm run build            # Build production
8. code .                   # Open in VS Code
9. cat .env.local           # Check env vars
10. npm audit               # Security check
```

---

## 💡 Pro Tips

```bash
# Open VS Code in current folder
code .

# Open project folder in Explorer
explorer .

# Quick edit .env
notepad .env.local

# View process list
Get-Process | Where-Object {$_.Name -eq "node"}

# Multiple terminals (VS Code)
Ctrl + Shift + ` (new terminal)
Ctrl + ` (toggle terminal)
```

---

## 📚 Documentation Commands

```bash
# Read README
cat README.md

# Read specific doc
cat LOCAL_TESTING.md

# Search in docs
Select-String -Path "*.md" -Pattern "Groq"

# List all docs
ls *.md
```

---

## 🎉 First Time Setup

Copy-paste ini untuk pertama kali:

```bash
# 1. Masuk folder
cd f:\webproject\randomtopicaiml

# 2. Install
npm install

# 3. Setup env
Copy-Item .env.local.example .env.local
notepad .env.local
# Tambahkan: GROQ_API_KEY=your_key_here

# 4. Run!
npm run dev

# 5. Open
Start-Process "http://localhost:3000"
```

---

**Save this file for quick reference! 📌**

Kalau lupa command, buka file ini! ⚡
