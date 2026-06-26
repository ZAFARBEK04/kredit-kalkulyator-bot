/**
 * KREDIT KALKULYATOR TELEGRAM BOTI
 * Node.js + Telegraf | Railway uchun moslashtirilgan
 *
 * Webhook EMAS - bu yerda POLLING ishlatiladi, chunki Railway'da
 * doimiy ishlab turadigan process bo'lishi mumkin (sovuq start yo'q).
 */

const { Telegraf, Markup } = require('telegraf');
const path = require('path');
const fs = require('fs');

const { t } = require('./lang');
const {
  parseNumber,
  calculateCredit,
  calculateMaxLoanAmount,
  calculateAnnuityPayment,
  LOAN_TERMS,
} = require('./calculator');
const { formatResultMessage, formatScheduleTable, formatFreeCalcResult } = require('./formatters');

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error('XATO: BOT_TOKEN environment variable topilmadi!');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ====== BANNER YO'LLARI ======
const ASSETS_DIR = path.join(__dirname, 'assets');
const BANNERS = {
  welcome: path.join(ASSETS_DIR, 'banner_welcome.png'),
  language: path.join(ASSETS_DIR, 'banner_language.png'),
  result: path.join(ASSETS_DIR, 'banner_result.png'),
  schedule: path.join(ASSETS_DIR, 'banner_schedule.png'),
};

// ====== XOTIRADA SESSIYA (oddiy, tezkor - Map orqali) ======
// Railway'da process doim ishlab turadi, shuning uchun fayl emas, xotirada saqlash yetarli va tezroq.
const sessions = new Map();

function getSession(chatId) {
  return sessions.get(chatId) || {};
}

function saveSession(chatId, data) {
  sessions.set(chatId, data);
}

// ====== TUGMALAR ======

function langKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🇺🇿 O'zbekcha", 'lang_uz'),
      Markup.button.callback('🇷🇺 Русский', 'lang_ru'),
    ],
  ]);
}

function mainMenuKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'btn_step'), 'mode_step')],
    [Markup.button.callback(t(lang, 'btn_oneline'), 'mode_oneline')],
    [Markup.button.callback(t(lang, 'btn_free_calc'), 'mode_free_calc')],
    [Markup.button.callback(t(lang, 'btn_change_lang'), 'change_lang')],
  ]);
}

function afterResultKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'btn_schedule'), 'show_schedule')],
    [Markup.button.callback(t(lang, 'btn_restart'), 'restart')],
  ]);
}

function termChoiceKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'btn_term_12'), 'sched_12')],
    [Markup.button.callback(t(lang, 'btn_term_24'), 'sched_24')],
    [Markup.button.callback(t(lang, 'btn_term_36'), 'sched_36')],
    [Markup.button.callback(t(lang, 'btn_restart'), 'restart')],
  ]);
}

function freeCalcResultKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, 'btn_schedule'), 'show_free_schedule')],
    [Markup.button.callback(t(lang, 'btn_restart'), 'restart')],
  ]);
}

// ====== YORDAMCHI: BANNER + MATN YUBORISH ======

async function sendBannerMessage(ctx, bannerKey, caption, keyboard) {
  const bannerPath = BANNERS[bannerKey];
  const options = { caption, parse_mode: 'HTML' };
  if (keyboard) options.reply_markup = keyboard.reply_markup;

  if (bannerPath && fs.existsSync(bannerPath)) {
    await ctx.replyWithPhoto({ source: bannerPath }, options);
  } else {
    // Banner topilmasa, faqat matn yuboriladi (zaxira yo'l)
    await ctx.reply(caption, { parse_mode: 'HTML', ...(keyboard || {}) });
  }
}

async function sendMainMenu(ctx, lang) {
  await sendBannerMessage(ctx, 'welcome', t(lang, 'welcome'), mainMenuKeyboard(lang));
}

// ====== /start BUYRUG'I ======

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  saveSession(chatId, { lang: null, state: null });
  await sendBannerMessage(ctx, 'language', t('uz', 'choose_lang'), langKeyboard());
});

// ====== TIL TANLASH ======

bot.action('lang_uz', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  saveSession(chatId, { lang: 'uz', state: null });
  await sendMainMenu(ctx, 'uz');
});

bot.action('lang_ru', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  saveSession(chatId, { lang: 'ru', state: null });
  await sendMainMenu(ctx, 'ru');
});

bot.action('change_lang', async (ctx) => {
  await ctx.answerCbQuery();
  await sendBannerMessage(ctx, 'language', t('uz', 'choose_lang'), langKeyboard());
});

// ====== USUL TANLASH ======

bot.action('mode_step', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  saveSession(chatId, { ...session, state: 'awaiting_salary_step' });
  await ctx.reply(t(lang, 'ask_salary'), { parse_mode: 'HTML' });
});

bot.action('mode_oneline', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  saveSession(chatId, { ...session, state: 'awaiting_oneline' });
  await ctx.reply(t(lang, 'oneline_instruction'), { parse_mode: 'HTML' });
});

bot.action('mode_free_calc', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  saveSession(chatId, { ...session, state: 'awaiting_free_amount' });
  await ctx.reply(t(lang, 'free_ask_amount'), { parse_mode: 'HTML' });
});

// ====== JADVAL KO'RSATISH ======

bot.action('show_schedule', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  await sendBannerMessage(ctx, 'schedule', t(lang, 'choose_term_for_schedule'), termChoiceKeyboard(lang));
});

bot.action(/sched_(12|24|36)/, async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  const months = Number(ctx.match[1]);
  const rate = LOAN_TERMS[months];
  const availableMonthly = session.availableMonthly;

  if (rate !== undefined && availableMonthly > 0) {
    const principal = calculateMaxLoanAmount(availableMonthly, months, rate);
    const scheduleMsg = formatScheduleTable(lang, principal, months, rate);
    await ctx.reply(scheduleMsg, { parse_mode: 'HTML', ...afterResultKeyboard(lang) });
  } else {
    await sendMainMenu(ctx, lang);
  }
});

bot.action('show_free_schedule', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  const { freeAmount, freeRate, freeMonths } = session;

  if (freeAmount > 0 && freeRate > 0 && freeMonths > 0) {
    const annualRate = freeRate / 100;
    const scheduleMsg = formatScheduleTable(lang, freeAmount, freeMonths, annualRate);
    await ctx.reply(scheduleMsg, { parse_mode: 'HTML', ...freeCalcResultKeyboard(lang) });
  } else {
    await sendMainMenu(ctx, lang);
  }
});

bot.action('restart', async (ctx) => {
  await ctx.answerCbQuery();
  const chatId = ctx.chat.id;
  const session = getSession(chatId);
  const lang = session.lang || 'uz';
  saveSession(chatId, { lang, state: null });
  await sendMainMenu(ctx, lang);
});

// ====== ODDIY MATN XABARLAR ======

bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text.trim();
  const session = getSession(chatId);
  const lang = session.lang;
  const state = session.state;

  if (text === '/start' || !lang) {
    saveSession(chatId, { lang: null, state: null });
    await sendBannerMessage(ctx, 'language', t('uz', 'choose_lang'), langKeyboard());
    return;
  }

  // Bosqichma-bosqich: maosh kutilmoqda
  if (state === 'awaiting_salary_step') {
    const salary = parseNumber(text);
    if (salary === null) return ctx.reply(t(lang, 'error_number'));
    if (salary < 0) return ctx.reply(t(lang, 'error_negative'));

    saveSession(chatId, { ...session, salary, state: 'awaiting_payment_step' });
    return ctx.reply(t(lang, 'ask_existing_payment'), { parse_mode: 'HTML' });
  }

  // Bosqichma-bosqich: joriy to'lov kutilmoqda
  if (state === 'awaiting_payment_step') {
    const payment = parseNumber(text);
    if (payment === null) return ctx.reply(t(lang, 'error_number'));
    if (payment < 0) return ctx.reply(t(lang, 'error_negative'));

    const salary = session.salary;
    if (payment > salary) return ctx.reply(t(lang, 'error_payment_too_big'));

    const result = calculateCredit(salary, payment);
    const resultMsg = formatResultMessage(lang, result);

    saveSession(chatId, { lang, state: null, availableMonthly: result.availableMonthly });
    await sendBannerMessage(ctx, 'result', resultMsg, afterResultKeyboard(lang));
    return;
  }

  // Tez usul: bir xabarda ikkita raqam
  if (state === 'awaiting_oneline') {
    const parts = text.split(/\s+/);
    if (parts.length !== 2) return ctx.reply(t(lang, 'error_oneline_format'), { parse_mode: 'HTML' });

    const salary = parseNumber(parts[0]);
    const payment = parseNumber(parts[1]);
    if (salary === null || payment === null) {
      return ctx.reply(t(lang, 'error_oneline_format'), { parse_mode: 'HTML' });
    }
    if (salary < 0 || payment < 0) return ctx.reply(t(lang, 'error_negative'));
    if (payment > salary) return ctx.reply(t(lang, 'error_payment_too_big'));

    const result = calculateCredit(salary, payment);
    const resultMsg = formatResultMessage(lang, result);

    saveSession(chatId, { lang, state: null, availableMonthly: result.availableMonthly });
    await sendBannerMessage(ctx, 'result', resultMsg, afterResultKeyboard(lang));
    return;
  }

  // ====== ERKIN KALKULYATOR: summa kutilmoqda ======
  if (state === 'awaiting_free_amount') {
    const amount = parseNumber(text);
    if (amount === null || amount <= 0) return ctx.reply(t(lang, 'error_amount_invalid'));

    saveSession(chatId, { ...session, freeAmount: amount, state: 'awaiting_free_rate' });
    return ctx.reply(t(lang, 'free_ask_rate'), { parse_mode: 'HTML' });
  }

  // ====== ERKIN KALKULYATOR: foiz stavkasi kutilmoqda ======
  if (state === 'awaiting_free_rate') {
    const rate = parseNumber(text);
    if (rate === null || rate <= 0) return ctx.reply(t(lang, 'error_rate_invalid'));

    saveSession(chatId, { ...session, freeRate: rate, state: 'awaiting_free_months' });
    return ctx.reply(t(lang, 'free_ask_months'), { parse_mode: 'HTML' });
  }

  // ====== ERKIN KALKULYATOR: muddat kutilmoqda - yakuniy hisoblash ======
  if (state === 'awaiting_free_months') {
    const months = parseNumber(text);
    if (months === null || months <= 0 || !Number.isInteger(months)) {
      return ctx.reply(t(lang, 'error_months_invalid'));
    }

    const amount = session.freeAmount;
    const ratePercent = session.freeRate;
    const annualRate = ratePercent / 100;
    const monthlyPayment = calculateAnnuityPayment(amount, months, annualRate);

    const resultMsg = formatFreeCalcResult(lang, amount, ratePercent, months, monthlyPayment);

    saveSession(chatId, {
      lang,
      state: null,
      freeAmount: amount,
      freeRate: ratePercent,
      freeMonths: months,
    });
    await sendBannerMessage(ctx, 'result', resultMsg, freeCalcResultKeyboard(lang));
    return;
  }

  // Hech qaysi holatga to'g'ri kelmasa — bosh menyuni ko'rsatish
  await sendMainMenu(ctx, lang);
});

// ====== XATOLARNI USHLASH ======

bot.catch((err, ctx) => {
  console.error(`Xato yuz berdi (${ctx.updateType}):`, err);
});

// ====== ISHGA TUSHIRISH ======

bot.launch().then(() => {
  console.log('✅ Bot muvaffaqiyatli ishga tushdi (polling rejimida)');
});

// Railway/Docker uchun toza to'xtatish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
