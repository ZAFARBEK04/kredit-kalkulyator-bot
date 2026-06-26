const { t } = require('./lang');
const {
  formatNumber,
  formatShort,
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
 * Telefon ekraniga to'liq sig'ishi uchun monospace (<pre>) va qisqa ustun nomlari ishlatiladi.
 */
function formatScheduleTable(lang, principal, months, annualRate) {
  const schedule = buildAmortizationSchedule(principal, months, annualRate);
  const monthlyPayment = schedule[0].payment;

  const header = t(lang, 'schedule_header');
  const lines = [header, '-'.repeat(38)];

  for (const row of schedule) {
    const monthStr = String(row.month).padEnd(3);
    const paymentStr = formatShort(row.payment).padStart(7);
    const interestStr = formatShort(row.interest).padStart(6);
    const principalStr = formatShort(row.principal).padStart(7);
    const balanceStr = formatShort(row.balance).padStart(8);
    lines.push(`${monthStr} ${paymentStr} ${interestStr} ${principalStr} ${balanceStr}`);
  }

  const tableText = lines.join('\n');

  const title = t(lang, 'schedule_title') + '\n'
    + t(lang, 'schedule_principal', { principal: formatNumber(principal) }) + '\n'
    + t(lang, 'schedule_term_rate', { months, rate: Math.round(annualRate * 100) }) + '\n'
    + t(lang, 'schedule_monthly', { payment: formatNumber(monthlyPayment) }) + '\n'
    + t(lang, 'schedule_units_note') + '\n';

  return title + '\n<pre>' + tableText + '</pre>';
}

module.exports = { formatResultMessage, formatScheduleTable };
