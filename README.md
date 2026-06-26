# Kredit Kalkulyator Bot — Node.js + Railway

Node.js (Telegraf) asosidagi Telegram kredit kalkulyator boti. Fintech uslubidagi bannerlar, ikki tilli (UZ/RU), Markaziy bank talablariga muvofiq hisob-kitob.

## Loyihada nima bor

- `index.js` — asosiy bot logikasi (polling rejimida)
- `calculator.js` — hisoblash mantiqi (annuitet formula, amortizatsiya jadvali)
- `lang.js` — UZ/RU matnlar
- `formatters.js` — natija va jadval xabarlarini formatlash
- `assets/` — fintech uslubidagi statik PNG bannerlar (har bosqich uchun)
- `generate_banners.py` — bannerlarni qayta generatsiya qilish skripti (ixtiyoriy, Python kerak)

## GitHub'ga yuklash

1. GitHub'da yangi repository yarating (masalan `kredit-kalkulyator-bot`)
2. Shu papkadagi barcha fayllarni (papka tuzilishini saqlab) repository'ga yuklang:
   - Git orqali: `git init`, `git add .`, `git commit -m "Initial commit"`, `git remote add origin <repo-url>`, `git push -u origin main`
   - Yoki GitHub web interfeysi orqali "Upload files" tugmasi bilan

**Muhim:** `.env` faylini hech qachon yuklamang (token maxfiy bo'lishi kerak) — `.gitignore` allaqachon shuni nazarda tutadi.

## Railway'ga joylashtirish

1. [railway.com](https://railway.com) saytida ro'yxatdan o'ting (GitHub orqali kirish qulay)
2. **New Project** → **Deploy from GitHub repo** → yuklagan repository'ngizni tanlang
3. Railway avtomatik ravishda `package.json`ni aniqlab, Node.js loyihasi sifatida deploy qiladi
4. **Variables** bo'limiga o'tib, environment variable qo'shing:
   - Key: `BOT_TOKEN`
   - Value: BotFather'dan olgan tokeningiz
5. Saqlang — Railway avtomatik ravishda qayta deploy qiladi
6. **Deployments** bo'limida loglarni kuzatib, `✅ Bot muvaffaqiyatli ishga tushdi` xabarini ko'rishingiz kerak

## Botni sinash

Telegram'da botingizga `/start` yuboring. Bu safar polling rejimida ishlaydi — webhook, domen, SSL kerak emas, Railway server doim ishlab turadi.

## Nega bu yondashuv tezroq va chiroyli?

- **Polling, lekin doimiy server** — Railway'da process 24/7 ishlab turadi (PHP-FPM cheklovi yo'q, parallel foydalanuvchi muammosi yo'q)
- **Xotirada sessiya** (`Map` orqali) — fayl o'qish/yozish kerak emas, bu sezilarli tezlik beradi
- **Statik PNG bannerlar** — har safar qaytadan chizilmaydi, oldindan tayyorlangan, shuning uchun yuborish tezligi yuqori
- **Telegraf kutubxonasi** — Node.js'da Telegram bot yozish uchun eng barqaror va keng qo'llaniladigan kutubxona

## Bannerlarni o'zgartirish

Agar bannerlar dizaynini o'zgartirish kerak bo'lsa, `generate_banners.py` faylini tahrirlab, qayta ishga tushiring:

```bash
pip install pillow
python3 generate_banners.py
```

Bu `assets/` papkasidagi 4 ta PNG faylni qayta yaratadi: `banner_welcome.png`, `banner_language.png`, `banner_result.png`, `banner_schedule.png`.
