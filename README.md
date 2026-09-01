# Salon Project 🎬

یک پروژه وبسایت Salon که با TypeScript، React و Gemini API ساخته شده است.

---

## 🚀 شروع سریع

### پیش‌نیازها:
- Node.js (نسخه 18 یا بالاتر)
- حساب GitHub
- حساب Vercel
- حساب Cloudflare

### مراحل نصب و اجرا محلی

1. **Fork کردن پروژه:**
   - به [این لینک](https://github.com/amirofski/Salon) بروید
   - روی دکمه **Fork** کلیک کنید تا یک کپی از این پروژه در حساب GitHub خود ایجاد شود

2. **Clone کردن پروژه:**
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/Salon.git
   cd Salon
   ```

3. **نصب وابستگی‌ها:**
   ```bash
   npm install
   ```

4. **تنظیم متغیرهای محیطی:**
   - فایل `.env.local` را باز کنید
   - کلید Gemini API خود را قرار دهید:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. **اجرای برنامه:**
   ```bash
   npm run dev
   ```
   - برنامه در `http://localhost:3000` اجرا می‌شود

---

## 🌐 استقرار در Vercel و اتصال به دامنه دلخواه

### مرحله ۱: استقرار در Vercel

1. به [Vercel.com](https://vercel.com) برید و با حساب GitHub خود وارد شوید
2. روی **"Import Project"** کلیک کنید
3. Repository خود را از GitHub انتخاب کنید: `[YOUR_USERNAME]/Salon`
4. **متغیرهای محیطی را تنظیم کنید:**
   - `GEMINI_API_KEY` را اضافه کنید
5. روی **"Deploy"** کلیک کنید

✅ پروژه شما در Vercel مستقر شد و در URL پیش‌فرض Vercel قابل دسترسی است

### مرحله ۲: اتصال دامنه دلخواه (Cloudflare)

#### الف) خریداری دامنه یا استفاده از دامنه موجود:
- می‌توانید دامنه را از Cloudflare یا دیگر ارائه‌دهندگان خریداری کنید

#### ب) تنظیم DNS در Cloudflare:

1. به [Cloudflare.com](https://cloudflare.com) برید و وارد شوید
2. دامنه خود را انتخاب کنید یا اضافه کنید
3. به بخش **"DNS"** بروید
4. یک رکورد `CNAME` اضافه کنید:
   - **Name:** `www` (یا هر subdomain دلخواه)
   - **Type:** `CNAME`
   - **Content:** `cname.vercel-dns.com`
   - **Proxy Status:** Proxied (رنگ زرد)

5. برای subdomain رایج (مثل `example.com`):
   - یک رکورد `A` اضافه کنید:
   - **Name:** `@`
   - **Type:** `A`
   - **Content:** `76.76.19.21`

#### ج) تنظیم دامنه در Vercel:

1. به [Vercel Dashboard](https://vercel.com/dashboard) برید
2. پروژه `Salon` را انتخاب کنید
3. به **"Settings"** → **"Domains"** بروید
4. دامنه خود را اضافه کنید
5. تأیید DNS انجام می‌شود و اتصال برقرار می‌گردد

✅ دامنه دلخواه شما اکنون به پروژه Vercel متصل است

---

## 🤖 به‌روزرسانی پروژه با کمک AI

### استفاده از GitHub Copilot برای توسعه:

1. **در VSCode:**
   - Extension **GitHub Copilot** را نصب کنید
   - با حساب GitHub خود وارد شوید
   - Copilot به‌طور خودکار پیشنهادهای کد را ارائه می‌دهد

2. **برای اضافه کردن ویژگی‌های جدید:**
   ```bash
   # یک branch جدید برای feature بسازید
   git checkout -b feature/new-feature
   
   # در VSCode بنویسید و از Copilot کمک بگیرید
   # از Copilot برای تکمیل کد، تولید تست و بهینه‌سازی استفاده کنید
   
   # تغییرات را commit کنید
   git add .
   git commit -m "Add new feature with AI assistance"
   git push origin feature/new-feature
   ```

3. **ایجاد Pull Request:**
   - به GitHub برید
   - **"Compare & Pull Request"** را کلیک کنید
   - توضیحات را اضافه کنید
   - روی **"Create Pull Request"** کلیک کنید

4. **با Copilot Workspace (GitHub):**
   - در repository خود، **"Code"** → **"Codespaces"** → **"Create codespace"** را انتخاب کنید
   - یک محیط توسعه ابری با Copilot فعال تهیه می‌شود
   - می‌توانید بدون نیاز به نصب محلی کار کنید

---

## 📹 نمایش ویدیویی

برای نمایش ویدیویی از پروژه، می‌توانید یک فایل ویدیویی اضافه کنید:

```markdown
[![Salon Website Demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

یا اگر ویدیو در پر��ژه ذخیره شده است:

```html
<video width="100%" height="auto" controls>
  <source src="./path/to/your/video.mp4" type="video/mp4">
  مرورگر شما از ویدیو پشتیبانی نمی‌کند
</video>
```

---

## 📋 نیازمندی‌ها و ویژگی‌ها

- ✅ TypeScript (۹۶%)
- ✅ CSS (۲.۱%)
- ✅ HTML (۱.۹%)
- ✅ Gemini API برای قابلیت‌های AI
- ✅ Vercel برای Hosting بدون هاست
- ✅ Cloudflare برای مدیریت دامنه و DNS
- ✅ GitHub Copilot برای توسعه سریع‌تر

---

## 📞 تماس و پشتیبانی

برای سؤالات یا پیشنهادات:
- Issue را در GitHub ایجاد کنید
- با صاحب پروژه تماس بگیرید

---

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

**Happy Coding! 🚀**
