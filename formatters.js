const { t } = require('./lang');
const {
  formatNumber,
  calculateAllTermsOffers,
  buildAmortizationSchedule,
} = require('./calculator');

function formatResultMessage(lang, result) {
  let msg = t(lang, 'result_title');
  msg += '\n' + t(lang, 'result_salary', { salary: formatNumber(result.salary) });
  msg += '\n' + t(lang, 'result_max_debt', { max_debt: formatNumber(result.maxTotalDebt) });
  msg += '\n' + t(lang, 'result_max_monthly', { max_monthly: formatNumber(result.maxMonthlyPayment) });
  msg += '\n' + t(lang, 'result_existing', { existing: formatNumber(result.existingPayment) });

  if (result.hasAvailable) {
    msg += '\n' + t(lang, 'result_available', { available: formatNumber(result.availableMonthly) });
    msg += '\n\n' + t(lang, 'offers_title');
    const offers = calculateAllTermsOffers(result.availableMonthly);
    for (const [months, offer] of Object.entries(offers)) {
      const ratePercent = Math.round(offer.rate * 100);
      msg += '\n' + t(lang, 'offer_line', {
        months,
        rate: ratePercent,
        amount: formatNumber(offer.maxAmount),
      });
    }
  } else {
    msg += '\n' + t(lang, 'result_no_available');
  }

  msg += t(lang, 'result_note');
  return msg;
}

/**
 * Amortizatsiya jadvalini Telegram xabari uchun formatlash.
 * To'liq sonlar (bo'shliq bilan ajratilgan), ustunlar dinamik kenglikda
 * to'g'ri tekislanadi. <pre> (monospace) Telegram'da odatdagidan
 * kichikroq shrift bilan chiqadi, shuning uchun telefon ekraniga ham sig'adi.
 */
function formatScheduleTable(lang, principal, months, annualRate) {
  const schedule = buildAmortizationSchedule(principal, months, annualRate);
  const monthlyPayment = schedule[0].payment;

  // Har bir ustun uchun barcha qiymatlarni avval formatlab, eng katta uzunlikni topamiz
  const monthCol = schedule.map((r) => String(r.month));
  const paymentCol = schedule.map((r) => formatNumber(r.payment));
  const interestCol = schedule.map((r) => formatNumber(r.interest));
  const principalCol = schedule.map((r) => formatNumber(r.principal));
  const balanceCol = schedule.map((r) => formatNumber(r.balance));

  const headerParts = t(lang, 'schedule_header').split('|').map((s) => s.trim());
  const widths = [
    Math.max(headerParts[0].length, ...monthCol.map((s) => s.length)),
    Math.max(headerParts[1].length, ...paymentCol.map((s) => s.length)),
    Math.max(headerParts[2].length, ...interestCol.map((s) => s.length)),
    Math.max(headerParts[3].length, ...principalCol.map((s) => s.length)),
    Math.max(headerParts[4].length, ...balanceCol.map((s) => s.length)),
  ];

  const headerLine = headerParts.map((s, i) => s.padEnd(widths[i])).join('|');
  const sepLine = '-'.repeat(headerLine.length);

  const lines = [headerLine, sepLine];
  for (let i = 0; i < schedule.length; i++) {
    const row = [
      monthCol[i].padEnd(widths[0]),
      paymentCol[i].padStart(widths[1]),
      interestCol[i].padStart(widths[2]),
      principalCol[i].padStart(widths[3]),
      balanceCol[i].padStart(widths[4]),
    ];
    lines.push(row.join('|'));
  }

  const tableText = lines.join('\n');

  const title = t(lang, 'schedule_title') + '\n'
    + t(lang, 'schedule_principal', { principal: formatNumber(principal) }) + '\n'
    + t(lang, 'schedule_term_rate', { months, rate: Math.round(annualRate * 100) }) + '\n'
    + t(lang, 'schedule_monthly', { payment: formatNumber(monthlyPayment) }) + '\n';

  return title + '\n<pre>' + tableText + '</pre>';
}

module.exports = { formatResultMessage, formatScheduleTable };
