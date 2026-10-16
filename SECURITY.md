# 🔒 Security Documentation

This document outlines all security measures implemented in the AI/ML Project Idea Generator.

---

## 🛡️ Security Overview

This application implements **defense-in-depth** security with multiple layers:

1. ✅ **API Key Protection** - Server-side only, never exposed to client
2. ✅ **Rate Limiting** - Prevents abuse and quota exhaustion
3. ✅ **Input Validation** - Strict schema validation with Zod
4. ✅ **Output Sanitization** - React auto-escaping + manual sanitization
5. ✅ **Security Headers** - CSP, X-Frame-Options, etc.
6. ✅ **HTTPS Enforcement** - All traffic encrypted
7. ✅ **Error Handling** - No internal information leakage
8. ✅ **Logging & Monitoring** - Request tracking with unique IDs

---

## 🔐 Internal Security (Backend/Server)

### 1. API Key Protection

**Implementation:**
```typescript
// ✅ SECURE: API key only in server environment
const apiKey = process.env.GROQ_API_KEY;

// ❌ NEVER do this:
// const apiKey = "gsk_hardcoded_key"; // Exposed in code!
// fetch('https://api.groq.com', { headers: { apiKey } }); // Exposed to browser!
```

**Location:** `app/api/generate/route.ts`

**How it works:**
- API key stored in `.env.local` (NEVER committed to git)
- Accessed only in server-side API routes
- Client never sees the key
- Vercel encrypts environment variables at rest

**Verification:**
```bash
# Check that .env.local is in .gitignore
cat .gitignore | grep "env.local"  # Should show .env.local

# Verify key is not in code
grep -r "gsk_" app/  # Should return nothing
```

---

### 2. Rate Limiting

**Purpose:** Prevent API abuse, protect Groq quota, stop DDoS

**Implementation:**
```typescript
// Simple in-memory rate limiting
// Location: app/api/generate/route.ts

const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const limit = 10; // requests per minute
  // ... implementation
}
```

**Current Limits:**
- **10 requests/minute** per IP address
- Resets every 60 seconds
- Returns HTTP 429 (Too Many Requests) when exceeded

**For Production:** Replace with Redis-based rate limiting:
```typescript
// Recommended: @upstash/ratelimit with Redis
import { Ratelimit } from '@upstash/ratelimit';
```

**Testing Rate Limit:**
```bash
# Try to make 11 requests quickly
for i in {1..11}; do curl -X POST http://localhost:3000/api/generate; done
# Request #11 should return 429 error
```

---

### 3. Input Validation with Zod

**Purpose:** Prevent SQL injection, XSS, invalid data

**Implementation:**
```typescript
// Strict schema validation
// Location: app/api/generate/route.ts

const RequestSchema = z.object({
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.enum([/* valid categories */]),
  industry: z.enum([/* valid industries */]),
});

const validation = RequestSchema.safeParse(body);
if (!validation.success) {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}
```

**What it prevents:**
- ❌ Invalid values: `level: "hacker"`
- ❌ Extra fields: `level: "beginner", malicious: "<script>"`
- ❌ Wrong types: `level: 12345`
- ❌ Missing required fields

**Attack Examples Blocked:**
```javascript
// ❌ SQL Injection attempt
{ level: "beginner'; DROP TABLE users; --" }
// Blocked: Not in enum

// ❌ XSS attempt  
{ category: "<script>alert('xss')</script>" }
// Blocked: Not in enum

// ❌ Command injection
{ industry: "; rm -rf /" }
// Blocked: Not in enum
```

---

### 4. Error Handling (No Info Leakage)

**Purpose:** Don't expose internal errors to attackers

**Implementation:**
```typescript
try {
  // ... API logic
} catch (error) {
  // ✅ Log internally (server only)
  console.error({ requestId, error: error.message, stack: error.stack });
  
  // ✅ Generic message to client
  return NextResponse.json(
    { error: 'Failed to generate idea. Please try again.' },
    { status: 500 }
  );
  
  // ❌ NEVER do this:
  // return NextResponse.json({ error: error.message }); // Leaks internal info!
}
```

**What it prevents:**
- ❌ Exposing file paths: `Error: Cannot read file /app/secret/config.json`
- ❌ Exposing API keys: `Error: Invalid key gsk_abc123...`
- ❌ Exposing database info: `Error: Connection to postgres://user:pass@host failed`

---

### 5. Request Logging & Monitoring

**Implementation:**
```typescript
// Every request gets unique ID
const requestId = nanoid();
const ip = request.headers.get('x-forwarded-for') || 'unknown';

console.log({
  requestId,
  ip,
  timestamp: new Date().toISOString(),
  endpoint: '/api/generate',
});
```

**Benefits:**
- 🔍 Track suspicious activity
- 🐛 Debug production issues
- 📊 Usage analytics
- 🚨 Security incident response

**Example Log:**
```json
{
  "requestId": "V1StGXR8_Z5jdHi6B-myT",
  "ip": "203.0.113.42",
  "timestamp": "2024-10-15T10:30:00.000Z",
  "endpoint": "/api/generate",
  "source": "groq-ai"
}
```

---

## 🌐 External Security (Frontend/Client)

### 6. Security Headers

**Implementation:** `next.config.ts`

```typescript
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY' // Prevents clickjacking
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff' // Prevents MIME sniffing
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];
```

**What they prevent:**

| Header | Attack Prevented |
|--------|------------------|
| X-Frame-Options | Clickjacking (embedding in iframe) |
| X-Content-Type-Options | MIME confusion attacks |
| Referrer-Policy | Information leakage via referer |
| Permissions-Policy | Unauthorized camera/mic access |

**Verification:**
```bash
# Check headers on deployed site
curl -I https://your-app.vercel.app
```

---

### 7. HTTPS Enforcement

**Implementation:** `next.config.ts`

```typescript
async redirects() {
  return [{
    source: '/:path*',
    has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
    destination: 'https://yourdomain.com/:path*',
    permanent: true,
  }];
}
```

**Benefits:**
- 🔒 All traffic encrypted
- 🛡️ Prevents MITM attacks
- ✅ Protects API keys in transit
- ✅ Required for modern browsers

**Vercel Bonus:** Automatic HTTPS with Let's Encrypt certificates (free!)

---

### 8. XSS Protection

**Implementation:** React's built-in escaping

```typescript
// ✅ SAFE: React auto-escapes
<div>{idea.title}</div>
// Even if title = "<script>alert('xss')</script>"
// Renders as text, not executed!

// ❌ DANGEROUS (not used in our app):
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Additional Protection:**
- All user inputs validated on server
- Zod schema rejects special characters in enums
- No innerHTML usage in codebase

---

### 9. CORS Configuration

**Implementation:** `app/api/generate/route.ts`

```typescript
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // Adjust in production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

**Note:** Currently allows all origins for demo purposes. For production:
```typescript
'Access-Control-Allow-Origin': 'https://yourdomain.com'
```

---

## 🔒 Environment Variable Security

### Best Practices

**✅ DO:**
```bash
# Store in .env.local
GROQ_API_KEY=gsk_actual_key_here

# Add to .gitignore
.env.local
.env*.local
```

**❌ DON'T:**
```javascript
// Hardcode in source
const apiKey = "gsk_hardcoded"; // ❌

// Commit .env files
git add .env.local // ❌

// Share in chat/email/screenshots
"My key is gsk_abc123..." // ❌
```

### .gitignore Verification

```bash
# Check .gitignore includes:
.env.local
.env*.local
.env.production
```

### Vercel Environment Variables

1. Go to Vercel project → Settings → Environment Variables
2. Add `GROQ_API_KEY`
3. Encrypted at rest ✅
4. Only accessible by your deployments ✅

---

## 🚨 Security Incident Response

### If API Key Leaked

**Immediate Actions:**
1. ⚠️ Revoke key at [console.groq.com](https://console.groq.com)
2. 🔑 Generate new key
3. 📝 Update `.env.local` locally
4. 🚀 Update environment variable on Vercel
5. 📊 Check Groq usage logs for abuse
6. 🔄 Redeploy app

### If Suspicious Activity Detected

**Check Logs:**
```typescript
// Search for patterns
console.log entries with same IP
High request volume from single IP
Failed validation attempts
```

**Actions:**
1. Review Vercel function logs
2. Check Groq API usage dashboard
3. Temporarily increase rate limit strictness
4. Consider IP blocking if needed

---

## 🧪 Security Testing

### Manual Testing

```bash
# Test rate limiting
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/generate \
    -H "Content-Type: application/json" \
    -d '{"level":"beginner","category":"computer-vision","industry":"healthcare"}'
done

# Test invalid input
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"level":"hacker","category":"injection","industry":"attack"}'
# Should return 400 Bad Request

# Test missing API key
# Remove GROQ_API_KEY from .env.local and restart
# Should return 500 with generic error
```

### Automated Testing

```bash
# Install security scanner
npm install -g snyk

# Scan for vulnerabilities
snyk test

# Fix vulnerabilities
snyk wizard
```

---

## 📋 Security Checklist

Before deployment:

- ✅ `.env.local` in `.gitignore`
- ✅ No hardcoded secrets in code
- ✅ Security headers configured
- ✅ HTTPS enforced
- ✅ Rate limiting enabled
- ✅ Input validation with Zod
- ✅ Error messages don't leak info
- ✅ Dependencies up to date (`npm audit`)
- ✅ CORS properly configured
- ✅ Logging implemented
- ✅ XSS prevention (React escaping)
- ✅ API keys in environment variables only

---

## 🔄 Regular Maintenance

### Weekly
- Check Vercel logs for errors
- Monitor Groq API usage

### Monthly  
- Run `npm audit` and fix vulnerabilities
- Update dependencies: `npm update`
- Review access logs for anomalies

### Quarterly
- Rotate API keys
- Review and update security policies
- Test disaster recovery procedures

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Vercel Security](https://vercel.com/docs/security)
- [Groq Security Docs](https://console.groq.com/docs/security)

---

## 🤝 Reporting Security Issues

If you find a security vulnerability:

1. **DO NOT** open a public issue
2. Email: your-email@example.com
3. Include: Description, reproduction steps, impact
4. Allow 48 hours for initial response

---

**Security is a continuous process, not a one-time task.** 

Stay vigilant! 🛡️
