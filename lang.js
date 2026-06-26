/**
 * KO'P TILLI MATNLAR (UZ / RU)
 */

const LANG = {
  uz: {
    choose_lang: "Tilni tanlang / Р’С‹Р±РµСЂРёС‚Рµ СЏР·С‹Рє:",
    welcome: "рџ‘‹ Salom! Men sizga yangi kredit uchun ruxsat etilgan oylik to'lov miqdorini hisoblab beraman (O'zbekiston Markaziy banki talablariga muvofiq).\n\nQuyidagi usullardan birini tanlang:",
    btn_step: "рџ“ќ Bosqichma-bosqich",
    btn_oneline: "вљЎпёЏ Bir xabarda (tez)",
    btn_lang_uz: "рџ‡єрџ‡ї O'zbekcha",
    btn_lang_ru: "рџ‡·рџ‡є Р СѓСЃСЃРєРёР№",
    btn_restart: "рџ”„ Qayta hisoblash",
    btn_change_lang: "рџЊђ Tilni o'zgartirish",
    ask_salary: "рџ’° Oylik rasmiy maoshingizni kiriting (so'mda).\n\nMasalan: <b>8000000</b>",
    ask_existing_payment: "рџ’і Hozirda boshqa kreditlar/mikrokreditlar bo'yicha oyiga to'laydigan umumiy summangizni kiriting (so'mda).\n\nAgar kredit yo'q bo'lsa вЂ” <b>0</b> deb yozing.",
    oneline_instruction: "вљЎпёЏ Tez usul: ikkita raqamni bo'sh joy bilan ajratib yuboring:\n\n<b>OYLIK_MAOSH BOSHQA_TOLOVLAR</b>\n\nMasalan: <code>8000000 1000000</code>\n(8 mln maosh, hozir oyiga 1 mln boshqa kredit uchun to'laydi)\n\nAgar boshqa kredit yo'q bo'lsa: <code>8000000 0</code>",
    error_number: "вљ пёЏ Iltimos, faqat raqam kiriting. Masalan: 8000000",
    error_oneline_format: "вљ пёЏ Format xato. Ikkita raqamni bo'sh joy bilan kiriting.\n\nMasalan: <code>8000000 1000000</code>",
    error_negative: "вљ пёЏ Raqam manfiy bo'lishi mumkin emas. Qaytadan kiriting.",
    error_payment_too_big: "вљ пёЏ Joriy to'lov maoshdan katta bo'lishi mumkin emas. Qaytadan kiriting.",
    result_title: "рџ“Љ <b>HISOBLASH NATIJASI</b>\n",
    result_salary: "рџ’° Oylik maosh: <b>{salary} so'm</b>",
    result_max_debt: "рџЏ¦ Ruxsat etilgan maksimal umumiy qarz (8x): <b>{max_debt} so'm</b>",
    result_max_monthly: "рџ“… Ruxsat etilgan maksimal oylik to'lov yuki (50%): <b>{max_monthly} so'm</b>",
    result_existing: "рџ’і Hozirgi oylik to'lovlaringiz: <b>{existing} so'm</b>",
    result_available: "\nвњ… <b>Yangi kredit uchun oyiga to'lashingiz mumkin bo'lgan maksimal summa:</b>\n<b>{available} so'm</b>",
    result_no_available: "\nвќЊ <b>Afsuski, hozirgi to'lovlaringiz allaqachon limitga yetgan yoki undan oshib ketgan.</b>\nYangi kredit olish imkoniyati yo'q.",
    result_note: "\n\nв„№пёЏ <i>Eslatma: bu вЂ” taxminiy hisob-kitob. Yakuniy qaror va aniq shartlar bank/moliya tashkiloti tomonidan belgilanadi.</i>",
    btn_menu: "рџ“‹ Bosh menyu",
    offers_title: "рџ’ј <b>Muddat bo'yicha mumkin bo'lgan kredit summalari:</b>",
    offer_line: "в–«пёЏ {months} oy ({rate}% yillik) вЂ” <b>{amount} so'm</b>",
    choose_term_for_schedule: "рџ“… Qaysi muddat uchun to'liq to'lov jadvalini ko'rmoqchisiz?",
    btn_term_12: "12 oy (29%)",
    btn_term_24: "24 oy (30%)",
    btn_term_36: "36 oy (32%)",
    btn_schedule: "рџ“… To'lov jadvalini ko'rish",
    schedule_title: "рџ“… <b>To'lov jadvali</b>",
    schedule_principal: "Kredit summasi: <b>{principal} so'm</b>",
    schedule_term_rate: "Muddat: <b>{months}</b> oy | Stavka: <b>{rate}%</b> yillik",
    schedule_monthly: "Oylik to'lov: <b>{payment} so'm</b>",
    schedule_units_note: "<i>(jadvaldagi summalar mingga yaxlitlangan вЂ” \"k\")</i>",
    schedule_header: "Oy | To'lov | Foiz | Asosiy | Qoldiq",
  },
  ru: {
    choose_lang: "Tilni tanlang / Р’С‹Р±РµСЂРёС‚Рµ СЏР·С‹Рє:",
    welcome: "рџ‘‹ РџСЂРёРІРµС‚! РЇ СЂР°СЃСЃС‡РёС‚Р°СЋ РјР°РєСЃРёРјР°Р»СЊРЅРѕ РґРѕРїСѓСЃС‚РёРјС‹Р№ РµР¶РµРјРµСЃСЏС‡РЅС‹Р№ РїР»Р°С‚С‘Р¶ РїРѕ РЅРѕРІРѕРјСѓ РєСЂРµРґРёС‚Сѓ (СЃРѕРіР»Р°СЃРЅРѕ С‚СЂРµР±РѕРІР°РЅРёСЏРј Р¦РµРЅС‚СЂР°Р»СЊРЅРѕРіРѕ Р±Р°РЅРєР° РЈР·Р±РµРєРёСЃС‚Р°РЅР°).\n\nР’С‹Р±РµСЂРёС‚Рµ СЃРїРѕСЃРѕР±:",
    btn_step: "рџ“ќ РџРѕС€Р°РіРѕРІРѕ",
    btn_oneline: "вљЎпёЏ РћРґРЅРёРј СЃРѕРѕР±С‰РµРЅРёРµРј (Р±С‹СЃС‚СЂРѕ)",
    btn_lang_uz: "рџ‡єрџ‡ї O'zbekcha",
    btn_lang_ru: "рџ‡·рџ‡є Р СѓСЃСЃРєРёР№",
    btn_restart: "рџ”„ РќРѕРІС‹Р№ СЂР°СЃС‡С‘С‚",
    btn_change_lang: "рџЊђ РЎРјРµРЅРёС‚СЊ СЏР·С‹Рє",
    ask_salary: "рџ’° Р’РІРµРґРёС‚Рµ РІР°С€Сѓ РѕС„РёС†РёР°Р»СЊРЅСѓСЋ РµР¶РµРјРµСЃСЏС‡РЅСѓСЋ Р·Р°СЂРїР»Р°С‚Сѓ (РІ СЃСѓРјР°С…).\n\nРќР°РїСЂРёРјРµСЂ: <b>8000000</b>",
    ask_existing_payment: "рџ’і Р’РІРµРґРёС‚Рµ РѕР±С‰СѓСЋ СЃСѓРјРјСѓ, РєРѕС‚РѕСЂСѓСЋ РІС‹ СЃРµР№С‡Р°СЃ РїР»Р°С‚РёС‚Рµ РІ РјРµСЃСЏС† РїРѕ РґСЂСѓРіРёРј РєСЂРµРґРёС‚Р°Рј/РјРёРєСЂРѕРєСЂРµРґРёС‚Р°Рј (РІ СЃСѓРјР°С…).\n\nР•СЃР»Рё РєСЂРµРґРёС‚РѕРІ РЅРµС‚ вЂ” РЅР°РїРёС€РёС‚Рµ <b>0</b>.",
    oneline_instruction: "вљЎпёЏ Р‘С‹СЃС‚СЂС‹Р№ СЃРїРѕСЃРѕР±: РѕС‚РїСЂР°РІСЊС‚Рµ РґРІР° С‡РёСЃР»Р° С‡РµСЂРµР· РїСЂРѕР±РµР»:\n\n<b>Р—РђР РџР›РђРўРђ Р”Р РЈР“РР•_РџР›РђРўР•Р–Р</b>\n\nРќР°РїСЂРёРјРµСЂ: <code>8000000 1000000</code>\n(Р·Р°СЂРїР»Р°С‚Р° 8 РјР»РЅ, СЃРµР№С‡Р°СЃ РїР»Р°С‚РёС‚ 1 РјР»РЅ РІ РјРµСЃСЏС† РїРѕ РґСЂСѓРіРёРј РєСЂРµРґРёС‚Р°Рј)\n\nР•СЃР»Рё РґСЂСѓРіРёС… РєСЂРµРґРёС‚РѕРІ РЅРµС‚: <code>8000000 0</code>",
    error_number: "вљ пёЏ РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РІРІРµРґРёС‚Рµ С‚РѕР»СЊРєРѕ С‡РёСЃР»Рѕ. РќР°РїСЂРёРјРµСЂ: 8000000",
    error_oneline_format: "вљ пёЏ РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚. Р’РІРµРґРёС‚Рµ РґРІР° С‡РёСЃР»Р° С‡РµСЂРµР· РїСЂРѕР±РµР».\n\nРќР°РїСЂРёРјРµСЂ: <code>8000000 1000000</code>",
    error_negative: "вљ пёЏ Р§РёСЃР»Рѕ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РѕС‚СЂРёС†Р°С‚РµР»СЊРЅС‹Рј. Р’РІРµРґРёС‚Рµ СЃРЅРѕРІР°.",
    error_payment_too_big: "вљ пёЏ РўРµРєСѓС‰РёР№ РїР»Р°С‚С‘Р¶ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ Р·Р°СЂРїР»Р°С‚С‹. Р’РІРµРґРёС‚Рµ СЃРЅРѕРІР°.",
    result_title: "рџ“Љ <b>Р Р•Р—РЈР›Р¬РўРђРў Р РђРЎР§РЃРўРђ</b>\n",
    result_salary: "рџ’° Р•Р¶РµРјРµСЃСЏС‡РЅР°СЏ Р·Р°СЂРїР»Р°С‚Р°: <b>{salary} СЃСѓРј</b>",
    result_max_debt: "рџЏ¦ РњР°РєСЃРёРјР°Р»СЊРЅРѕ РґРѕРїСѓСЃС‚РёРјС‹Р№ РѕР±С‰РёР№ РґРѕР»Рі (8x): <b>{max_debt} СЃСѓРј</b>",
    result_max_monthly: "рџ“… РњР°РєСЃРёРјР°Р»СЊРЅРѕ РґРѕРїСѓСЃС‚РёРјР°СЏ РґРѕР»РіРѕРІР°СЏ РЅР°РіСЂСѓР·РєР° РІ РјРµСЃСЏС† (50%): <b>{max_monthly} СЃСѓРј</b>",
    result_existing: "рџ’і РўРµРєСѓС‰РёРµ РµР¶РµРјРµСЃСЏС‡РЅС‹Рµ РїР»Р°С‚РµР¶Рё: <b>{existing} СЃСѓРј</b>",
    result_available: "\nвњ… <b>РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ СЃСѓРјРјР°, РєРѕС‚РѕСЂСѓСЋ РјРѕР¶РЅРѕ РїР»Р°С‚РёС‚СЊ РїРѕ РЅРѕРІРѕРјСѓ РєСЂРµРґРёС‚Сѓ РІ РјРµСЃСЏС†:</b>\n<b>{available} СЃСѓРј</b>",
    result_no_available: "\nвќЊ <b>Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, С‚РµРєСѓС‰РёРµ РїР»Р°С‚РµР¶Рё СѓР¶Рµ РґРѕСЃС‚РёРіР»Рё Р»РёРјРёС‚Р° РёР»Рё РїСЂРµРІС‹С€Р°СЋС‚ РµРіРѕ.</b>\nР’РѕР·РјРѕР¶РЅРѕСЃС‚СЊ РїРѕР»СѓС‡РёС‚СЊ РЅРѕРІС‹Р№ РєСЂРµРґРёС‚ РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚.",
    result_note: "\n\nв„№пёЏ <i>РџСЂРёРјРµС‡Р°РЅРёРµ: СЌС‚Рѕ РїСЂРёР±Р»РёР¶С‘РЅРЅС‹Р№ СЂР°СЃС‡С‘С‚. РћРєРѕРЅС‡Р°С‚РµР»СЊРЅРѕРµ СЂРµС€РµРЅРёРµ Рё С‚РѕС‡РЅС‹Рµ СѓСЃР»РѕРІРёСЏ РѕРїСЂРµРґРµР»СЏСЋС‚СЃСЏ Р±Р°РЅРєРѕРј/С„РёРЅР°РЅСЃРѕРІРѕР№ РѕСЂРіР°РЅРёР·Р°С†РёРµР№.</i>",
    btn_menu: "рџ“‹ Р“Р»Р°РІРЅРѕРµ РјРµРЅСЋ",
    offers_title: "рџ’ј <b>Р’РѕР·РјРѕР¶РЅС‹Рµ СЃСѓРјРјС‹ РєСЂРµРґРёС‚Р° РїРѕ СЃСЂРѕРєР°Рј:</b>",
    offer_line: "в–«пёЏ {months} РјРµСЃ. ({rate}% РіРѕРґРѕРІС‹С…) вЂ” <b>{amount} СЃСѓРј</b>",
    choose_term_for_schedule: "рџ“… Р”Р»СЏ РєР°РєРѕРіРѕ СЃСЂРѕРєР° РїРѕРєР°Р·Р°С‚СЊ РїРѕР»РЅС‹Р№ РіСЂР°С„РёРє РїР»Р°С‚РµР¶РµР№?",
    btn_term_12: "12 РјРµСЃ. (29%)",
    btn_term_24: "24 РјРµСЃ. (30%)",
    btn_term_36: "36 РјРµСЃ. (32%)",
    btn_schedule: "рџ“… РџРѕРєР°Р·Р°С‚СЊ РіСЂР°С„РёРє РїР»Р°С‚РµР¶РµР№",
    schedule_title: "рџ“… <b>Р“СЂР°С„РёРє РїР»Р°С‚РµР¶РµР№</b>",
    schedule_principal: "РЎСѓРјРјР° РєСЂРµРґРёС‚Р°: <b>{principal} СЃСѓРј</b>",
    schedule_term_rate: "РЎСЂРѕРє: <b>{months}</b> РјРµСЃ. | РЎС‚Р°РІРєР°: <b>{rate}%</b> РіРѕРґРѕРІС‹С…",
    schedule_monthly: "Р•Р¶РµРјРµСЃСЏС‡РЅС‹Р№ РїР»Р°С‚С‘Р¶: <b>{payment} СЃСѓРј</b>",
    schedule_units_note: "<i>(СЃСѓРјРјС‹ РІ С‚Р°Р±Р»РёС†Рµ РѕРєСЂСѓРіР»РµРЅС‹ РґРѕ С‚С‹СЃСЏС‡ вЂ” \"k\")</i>",
    schedule_header: "РњРµСЃ | РџР»Р°С‚С‘Р¶ | РџСЂРѕС† | Р”РѕР»Рі | РћСЃС‚Р°С‚РѕРє",
  },
};

function t(lang, key, replacements = {}) {
  const l = LANG[lang] ? lang : 'uz';
  let text = LANG[l][key] !== undefined ? LANG[l][key] : key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
}

module.exports = { LANG, t };
