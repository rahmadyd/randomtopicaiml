# 🧪 Panduan Testing di Local

Panduan lengkap untuk menjalankan dan testing app di local sebelum deploy.

---

## 📋 Prerequisites Check

Sebelum mulai, pastikan sudah terinstall:

```bash
# Check Node.js (harus 18+)
node --version
# Output: v22.18.0 ✅

# Check npm
npm --version
# Output: 10.9.3 ✅
```

Kalau belum ada, download di: https://nodejs.org

---

## 🚀 Step-by-Step Running Local

### Step 1: Buka Terminal

**Windows:**
- Tekan `Win + R`
- Ketik `powershell`
- Enter

**Atau:**
- Buka VS Code
- Terminal → New Terminal (Ctrl + `)

### Step 2: Masuk ke Folder Project

```bash
# Masuk ke folder project
cd f:\webproject\randomtopicaiml

# Cek isi folder (pastikan ada package.json)
ls
```

Output harus menunjukkan file-file seperti:
```
package.json
next.config.ts
app/
components/
...
```

### Step 3: Install Dependencies

**Cara Otomatis (Recommended):**

```bash
.\setup.bat
```

Script ini akan:
- Install semua dependencies
- Create file `.env.local` dari template
- Show next steps

**Cara Manual:**

```bash
npm install
```

Tunggu proses selesai (2-5 menit tergantung internet).

Output sukses:
```
added 234 packages, and audited 235 packages in 2m

✨ Dependencies installed successfully!
```

### Step 4: Setup Groq API Key

#### 4.1 Dapatkan API Key

1. Buka browser, kunjungi: https://console.groq.com
2. Sign up / Login (gratis!)
3. Klik menu **"API Keys"** di sidebar
4. Klik **"Create API Key"**
5. Copy key yang muncul (format: `gsk_...`)

⚠️ **PENTING:** Jangan pakai key lama yang sudah di-share di chat!

#### 4.2 Buat File `.env.local`

**Option A - Copy dari template:**

```bash
# Windows PowerShell
Copy-Item .env.local.example .env.local

# Atau pakai File Explorer, copy-paste manual
```

**Option B - Buat manual:**

Buat file baru bernama `.env.local` di folder project root.

#### 4.3 Edit File `.env.local`

Buka file `.env.local` dengan text editor (Notepad, VS Code, dll):

```bash
# Buka dengan Notepad
notepad .env.local

# Atau dengan VS Code
code .env.local
```

Isi file:
```
GROQ_API_KEY=gsk_paste_key_kamu_di_sini
```

**Contoh:**
```
GROQ_API_KEY=gsk_abc123XYZ456def789
```

**Save file** (Ctrl + S)

### Step 5: Jalankan Development Server

```bash
npm run dev
```

Output sukses:
```
▲ Next.js 15.1.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 2.3s
```

**Jangan tutup terminal ini!** Biarkan tetap running.

### Step 6: Buka di Browser

**Otomatis:**
- Browser akan otomatis terbuka (jika tidak, lanjut ke manual)

**Manual:**
1. Buka browser (Chrome, Firefox, Edge)
2. Ketik di address bar: `http://localhost:3000`
3. Enter

---

## ✅ Verification - App Berhasil Running!

Kamu harus lihat:

✅ **Homepage muncul** dengan tampilan:
- Judul: "AI/ML Project Idea Generator"
- Icon sparkles di kiri-kanan judul
- Background gradient ungu-biru-pink

✅ **3 Dropdown terlihat:**
- 📊 Level Kesulitan
- 🤖 Kategori AI/ML
- 🏢 Industri

✅ **Button besar ungu:**
- "🎲 Generate Project Idea!"

Kalau semua ini terlihat → **SUCCESS!** ✅

---

## 🧪 Testing Flow Lengkap

### Test 1: Generate Idea (Static Database)

**Tujuan:** Test ambil ide dari database statis

**Steps:**
1. Pilih dropdown **Level**: `Beginner`
2. Pilih dropdown **Kategori**: `Computer Vision`
3. Pilih dropdown **Industri**: `Healthcare`
4. Klik button **"🎲 Generate Project Idea!"**

**Expected Result:**
- ✅ Animasi bingo muncul (~2 detik)
- ✅ Ide muncul: **"Medical Pill Identifier App"**
- ✅ Card menampilkan:
  - Level badge (hijau)
  - Kategori badge (ungu)
  - Industri badge (biru)
  - Deskripsi project
  - Stats (Duration, Techniques, Datasets, Outcomes)
  - Key Techniques
  - Learning Outcomes
- ✅ Scroll ke bawah → **Detailed Roadmap** terlihat dengan:
  - Phase 1, 2, 3 dengan tasks
  - Resources
  - Pro Tips
- ✅ Button **Save Idea**, **Share**, **Generate New** muncul

**Response Time:** < 200ms (dari static database)

---

### Test 2: Generate Idea (AI Powered)

**Tujuan:** Test generate dengan Groq AI

**Steps:**
1. Pilih dropdown **Level**: `Intermediate`
2. Pilih dropdown **Kategori**: `Time Series`
3. Pilih dropdown **Industri**: `Agriculture`
4. Klik button **"🎲 Generate Project Idea!"**

**Expected Result:**
- ✅ Animasi bingo muncul
- ✅ Loading ~1-2 detik (lebih lama dari static)
- ✅ Ide baru muncul (AI generated)
- ✅ Semua field terisi lengkap
- ✅ Roadmap detail dengan phases

**Response Time:** 1-3 detik (API call ke Groq)

**Kalau Error "API configuration error":**
- Cek `.env.local` ada dan berisi key
- Restart server (Ctrl+C, `npm run dev` lagi)

---

### Test 3: Save Functionality

**Steps:**
1. Generate sebuah ide (test 1 atau 2)
2. Klik button **"💾 Save Idea"**

**Expected Result:**
- ✅ Alert muncul: "Idea saved! ✅"

**Verify:**
```bash
# Buka browser console (F12 → Console tab)
# Ketik:
localStorage.getItem('savedIdeas')

# Harus return JSON array berisi idea yang disave
```

---

### Test 4: Share Functionality

**Steps:**
1. Generate sebuah ide
2. Klik button **"📤 Share"**

**Expected Result:**
- ✅ Alert muncul: "Link copied to clipboard! 📋"
- ✅ Atau (kalau browser support): Native share dialog muncul

---

### Test 5: Generate New

**Steps:**
1. Generate sebuah ide
2. Scroll ke bawah
3. Klik button **"🔄 Generate New"**

**Expected Result:**
- ✅ Idea card hilang
- ✅ Kembali ke form dropdown
- ✅ Siap generate ide baru

---

### Test 6: Rate Limiting

**Tujuan:** Test security rate limiting

**Steps:**
1. Generate ide 10 kali dengan cepat (klik berulang)

**Expected Result:**
- ✅ Request 1-10: Berhasil
- ✅ Request 11: Error muncul
  ```
  "Too many requests. Please try again in a minute."
  ```
- ✅ Tunggu 1 menit → Bisa generate lagi

---

### Test 7: Invalid Input

**Tujuan:** Test input validation

**Steps:**
1. Buka browser console (F12)
2. Ketik di console:
```javascript
fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    level: 'hacker',
    category: 'injection',
    industry: 'attack'
  })
}).then(r => r.json()).then(console.log)
```

**Expected Result:**
```json
{
  "error": "Invalid input parameters",
  "details": [...]
}
```

✅ **Security validation bekerja!**

---

### Test 8: Mobile Responsive

**Steps:**
1. Browser masih di `localhost:3000`
2. Tekan **F12** (Developer Tools)
3. Klik icon **mobile/tablet** (Ctrl + Shift + M)
4. Pilih device: iPhone 12, iPad, dll

**Expected Result:**
- ✅ Layout responsive (tidak berantakan)
- ✅ Dropdown masih bisa diklik
- ✅ Button ukuran pas
- ✅ Card ide masih terbaca jelas

---

### Test 9: Dark Mode (Optional)

**Steps:**
1. Buka browser settings
2. Set theme ke **Dark**
3. Refresh page

**Expected Result:**
- ✅ Background berubah gelap
- ✅ Text tetap terbaca
- ✅ Card berubah warna

---

## 🐛 Troubleshooting

### Problem 1: "npm not found"

**Error:**
```
npm : The term 'npm' is not recognized...
```

**Solution:**
```bash
# Install Node.js dari: https://nodejs.org
# Restart terminal
# Test lagi: npm --version
```

---

### Problem 2: "Cannot find module"

**Error:**
```
Error: Cannot find module 'next'
```

**Solution:**
```bash
# Hapus node_modules
Remove-Item -Recurse -Force node_modules

# Install ulang
npm install
```

---

### Problem 3: "API configuration error"

**Error di browser:**
```
"API configuration error"
```

**Solution:**
```bash
# 1. Cek file .env.local ada
ls .env.local

# 2. Cek isinya
cat .env.local
# Harus ada: GROQ_API_KEY=gsk_...

# 3. Pastikan key valid (cek di console.groq.com)

# 4. Restart server
# Ctrl + C (stop)
npm run dev (start ulang)
```

---

### Problem 4: Port 3000 sudah dipakai

**Error:**
```
Port 3000 is already in use
```

**Solution A - Pakai port lain:**
```bash
npm run dev -- -p 3001
# Buka: http://localhost:3001
```

**Solution B - Kill process di port 3000:**
```bash
# Cari process
netstat -ano | findstr :3000

# Kill process (ganti PID dengan nomor dari hasil di atas)
taskkill /PID 1234 /F
```

---

### Problem 5: Animasi tidak muncul

**Symptom:**
- Generate button diklik
- Langsung muncul hasil (tidak ada animasi bingo)

**Cause:**
- Framer Motion tidak ter-install

**Solution:**
```bash
npm install framer-motion
# Restart: Ctrl+C, npm run dev
```

---

### Problem 6: "Too many requests" terus

**Symptom:**
- Setiap kali generate → error "too many requests"

**Cause:**
- Rate limit counter masih aktif

**Solution A - Reset counter:**
```bash
# Stop server: Ctrl + C
# Start lagi: npm run dev
```

**Solution B - Increase limit (untuk testing):**
Edit `app/api/generate/route.ts`, baris ~28:
```typescript
// Dari:
if (limit.count >= 10) {

// Jadi:
if (limit.count >= 100) {  // Lebih besar
```

---

### Problem 7: Styles tidak muncul

**Symptom:**
- Page muncul tapi tanpa warna/styling

**Solution:**
```bash
# Rebuild Tailwind
npm run dev
# Refresh browser dengan Ctrl + Shift + R (hard refresh)
```

---

## 📊 Performance Monitoring

### Check Response Time

Buka browser console (F12):

```javascript
// Test static database speed
console.time('static');
// Generate idea dengan kombinasi yang ada di database
console.timeEnd('static');
// Expected: < 200ms

// Test AI generation speed
console.time('ai');
// Generate idea dengan kombinasi baru
console.timeEnd('ai');
// Expected: 1000-3000ms
```

---

## 🔍 Debug Mode

Untuk lihat lebih detail apa yang terjadi:

### 1. Check Server Logs

Di terminal yang running `npm run dev`:

```
✓ Compiled /api/generate in 234ms
{
  requestId: 'V1StGXR8_Z5jdHi6B',
  ip: '::1',
  timestamp: '2024-10-15T10:30:00.000Z',
  endpoint: '/api/generate',
  source: 'static-database'
}
```

### 2. Check Browser Console

Tekan **F12** → Tab **Console**

Lihat apakah ada error merah.

### 3. Check Network Tab

Tekan **F12** → Tab **Network**

1. Generate idea
2. Lihat request ke `/api/generate`
3. Klik request tersebut
4. Check:
   - **Status**: Harus 200 (success)
   - **Response**: JSON data idea
   - **Time**: Berapa lama response

---

## ✅ Test Checklist

Copy-paste ini dan centang satu per satu:

```
[ ] Dependencies installed (npm install berhasil)
[ ] .env.local file created with valid Groq API key
[ ] Dev server running (npm run dev)
[ ] Homepage loads di http://localhost:3000
[ ] 3 dropdowns terlihat dan bisa diklik
[ ] Generate button bisa diklik
[ ] Animasi bingo muncul
[ ] Idea card muncul dengan data lengkap
[ ] Roadmap detail terlihat
[ ] Save button works (alert muncul)
[ ] Share button works
[ ] Generate New button works (reset form)
[ ] Mobile responsive (test dengan device emulator)
[ ] Rate limiting works (11th request error)
[ ] No console errors (check F12)
```

**Kalau semua ✅ → App siap deploy!** 🚀

---

## 🎯 Next Steps After Testing

Kalau semua test passed:

1. ✅ **Add more ideas** ke `data/ideas.json`
2. ✅ **Customize styling** kalau mau
3. ✅ **Test dengan teman** (feedback)
4. ✅ **Deploy ke Vercel** (lihat DEPLOYMENT.md)
5. ✅ **Share hasil kamu!** 🎉

---

## 💡 Tips Testing

**Best Practices:**
- Test semua kombinasi level-category-industry
- Test dengan internet lambat (throttle di Network tab)
- Test di browser berbeda (Chrome, Firefox, Edge)
- Test dengan adblock enabled
- Clear cache dan test lagi (Ctrl + Shift + Delete)

**Don't:**
- ❌ Jangan commit file `.env.local` (sudah di .gitignore)
- ❌ Jangan share API key
- ❌ Jangan spam rate limit (respek free tier!)

---

## 🆘 Still Having Issues?

1. **Check dokumentasi lain:**
   - `QUICKSTART.md` - Setup basics
   - `README.md` - Full documentation
   - `SECURITY.md` - Security details

2. **Check code comments:**
   - Buka file di VS Code
   - Semua file ada comment lengkap

3. **Google error message:**
   - Copy exact error
   - Google: "next.js [error message]"

---

**Happy Testing! 🧪✨**

Semua test berhasil? Kamu siap deploy! 🚀
