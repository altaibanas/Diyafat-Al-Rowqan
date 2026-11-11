# ضيافة الروقان (Diyafat Al-Rowqan)

الموقع الرسمي لخدمة تقديم القهوة السعودية ومراسم الضيافة للمناسبات والحفلات في مدينة الرياض.

## التقنيات المستخدمة
- **React 18 + Vite 6**
- **Tailwind CSS 3** (تجربة RTL عربية متكاملة)
- **Web Audio API** (محرك صوت أجواء المجلس المدمج دون ملفات خارجية)

## التشغيل محلياً
```bash
npm install
npm run dev
```

## بناء النسخة الإنتاجية
```bash
npm run build
npm run preview
```

## خطوات الرفع على GitHub والنشر المجاني على Vercel

1. **إنشاء مستودع على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "تجهيز الموقع للإنتاج والنشر"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
   *(ملف `.gitignore` يستبعد `node_modules/` و`dist/` تلقائياً)*

2. **الربط والنشر المجاني على Vercel:**
   - ادخل إلى [vercel.com](https://vercel.com) وسجل الدخول بحساب GitHub.
   - اختر **Add New Project** ثم اختر المستودع.
   - يتعرف Vercel تلقائياً عبر ملف `vercel.json` على:
     - **Framework Preset:** `Vite`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - اضغط **Deploy** — سيتم النشر مع تطبيق كافة ترويسات الأمان والتخزين المؤقت تلقائياً.
