# 🤖 Generator Ide Project AI/ML

Generate ide project AI dan Machine Learning yang unik dan detail, disesuaikan dengan level skill, minat, dan industri yang kamu pilih.

## ✨ Fitur Utama

- **🎯 Filter Pintar**: Pilih level (Beginner/Intermediate/Advanced), kategori AI/ML, dan industri
- **🎰 Animasi Bingo**: Efek slot-machine yang seru saat generate ide
- **🔒 Aman**: Implementasi security lengkap (rate limiting, validasi input, sanitasi)
- **⚡ Cepat**: Powered by Groq AI (Llama 3.1 70B) untuk generasi instan
- **📊 Roadmap Detail**: Panduan implementasi step-by-step berdasarkan level kamu
- **💾 Simpan & Bagikan**: Bookmark ide favorit dan share ke teman
- **🌓 Dark Mode**: UI yang cantik dengan dukungan tema terang/gelap

## 🚀 Cara Mulai Cepat

### Prasyarat

- Node.js 18+
- npm atau yarn  
- API key Groq (gratis di [console.groq.com](https://console.groq.com))

### Instalasi

1. **Install dependencies:**

```bash
cd randomtopicaiml
npm install
```

2. **Setup environment variables:**

```bash
# Copy file contoh env
copy .env.local.example .env.local

# Edit .env.local dan tambahkan API key Groq kamu:
GROQ_API_KEY=api_key_groq_kamu_di_sini
```

3. **Jalankan development server:**

```bash
npm run dev
```

4. **Buka di browser:**

```
http://localhost:3000
```

## 🔑 Cara Dapetin API Key Groq

1. Kunjungi [console.groq.com](https://console.groq.com)
2. Sign up/login (gratis!)
3. Masuk ke bagian API Keys
4. Buat key baru
5. Copy dan paste ke `.env.local`

**Batas Gratis:**
- 30 requests/menit
- 14,400 requests/hari
- Lebih dari cukup untuk app ini!

## 🏗️ Struktur Project

```
randomtopicaiml/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint aman dengan Groq
│   ├── page.tsx                   # Halaman utama aplikasi
│   ├── layout.tsx                 # Root layout dengan metadata
│   └── globals.css                # Global styles
├── components/
│   ├── DropdownSelectors.tsx      # Dropdown level, kategori, industri
│   ├── BingoAnimation.tsx         # Animasi slot machine
│   ├── IdeaCard.tsx              # Tampilan ide yang dihasilkan
│   └── DetailedRoadmap.tsx        # Roadmap step-by-step
├── data/
│   └── ideas.json                 # Ide statis fallback (bisa ditambah)
├── types/
│   └── index.ts                   # TypeScript interfaces
├── .env.local.example             # Template environment
└── next.config.ts                 # Security headers & config
```

## 🛡️ Fitur Keamanan

### Keamanan Internal
- ✅ Proteksi API key (server-side only, tidak pernah exposed)
- ✅ Rate limiting (10 requests/menit per IP)
- ✅ Validasi input dengan Zod schema
- ✅ Error handling (tidak bocorkan info internal)
- ✅ Request logging dengan unique ID

### Keamanan Eksternal
- ✅ Security headers (X-Frame-Options, CSP, dll)
- ✅ HTTPS enforcement
- ✅ Proteksi XSS (React auto-escaping)
- ✅ Konfigurasi CORS
- ✅ Environment variable safety

## 📊 Cara Kerja

### Pendekatan Hybrid (Statis + AI)

1. **User pilih preferensi** (level, kategori, industri)
2. **System cek database statis** untuk ide yang cocok
   - Kalau ketemu → Return instan (< 100ms)
   - Kalau tidak → Generate dengan Groq AI (1-2 detik)
3. **AI generate** project detail dengan roadmap
4. **Hasil di-cache** untuk request berikutnya

### Kategori yang Didukung

**Kategori AI/ML:**
- Computer Vision
- Natural Language Processing
- Time Series Forecasting
- Recommendation Systems
- Reinforcement Learning
- Generative AI
- Anomaly Detection
- Speech Processing

**Industri:**
- Healthcare
- Finance & Trading
- E-commerce & Retail
- Education & E-learning
- Social Media
- Gaming & Entertainment
- Agriculture
- Transportation

**Level:**
- Beginner (2-3 minggu)
- Intermediate (3-6 minggu)
- Advanced (6+ minggu)

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

1. **Push ke GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username-kamu/ai-project-ideas.git
git push -u origin main
```

2. **Deploy ke Vercel:**

- Buka [vercel.com](https://vercel.com)
- Klik "New Project"
- Import repository GitHub kamu
- Tambah environment variable: `GROQ_API_KEY`
- Klik "Deploy"

Selesai! App kamu live di `your-app.vercel.app` 🎉

### Resource Gratis

- **Vercel**: 100GB bandwidth, 100 deployments/hari
- **Groq**: 14,400 requests/hari gratis
- **Total biaya**: $0/bulan 💰

## 🎨 Kustomisasi

### Tambah Lebih Banyak Ide Statis

Edit `data/ideas.json` dan tambah object project baru:

```json
{
  "id": "unique-id",
  "title": "Judul Project Kamu",
  "description": "Deskripsi...",
  "level": "beginner",
  "category": "computer-vision",
  "industry": "healthcare",
  ...
}
```

### Ubah Warna UI

Edit `tailwind.config.ts` dan sesuaikan theme colors.

### Ganti Model AI

Edit `app/api/generate/route.ts` baris 127:

```typescript
model: 'mixtral-8x7b-32768', // Alternatif: lebih cepat, tapi kurang detail
```

## 📝 Development Scripts

```bash
# Mode development
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### "API configuration error"
- Cek file `.env.local` ada
- Pastikan `GROQ_API_KEY` diset dengan benar
- Restart dev server setelah ubah env vars

### "Too many requests"
- Tunggu 1 menit sebelum coba lagi
- Rate limit: 10 requests/menit per IP

### Build errors
- Hapus folder `.next`
- Jalankan `npm install` lagi
- Clear npm cache: `npm cache clean --force`

## 📄 Lisensi

MIT License - bebas digunakan untuk project personal atau komersial!

## 🙏 Credits

- **Dibuat dengan**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **AI Provider**: Groq (Llama 3.1 70B Versatile)
- **Deployment**: Vercel

## 📚 Dokumentasi Lengkap

- `README.md` - Dokumentasi lengkap (English)
- `QUICKSTART.md` - Panduan setup cepat
- `DEPLOYMENT.md` - Instruksi deploy ke production
- `SECURITY.md` - Detail implementasi security
- `HOW_TO_ADD_IDEAS.md` - Cara menambah ide project

---

**Dibuat dengan ❤️ untuk komunitas AI/ML Indonesia**

Selamat coding! 🚀
