/**
 * KREDIT HISOB-KITOB MANTIQI
 * Markaziy bank talabi: oylik to'lov yuki maoshning 50%idan oshmasligi kerak.
 * Muddatlar bo'yicha kredit summasi annuitet formulasi orqali hisoblanadi.
 */

const MAX_TOTAL_DEBT_MULTIPLIER = 8;   // Umumiy qarz: maoshning 8 baravaridan oshmasin
const MAX_MONTHLY_PAYMENT_RATIO = 0.5; // Oylik to'lov: maoshning 50%idan oshmasin

const LOAN_TERMS = {
  12: 0.29,
  24: 0.30,
  36: 0.32,
};

function formatNumber(num) {
  return Math.round(num).toLocaleString('ru-RU').replace(/,/g, ' ');
}

function parseNumber(text) {
  const clean = String(text).replace(/[^\d.,]/g, '').replace(',', '.');
  if (clean === '' || isNaN(Number(clean))) return null;
  return Number(clean);
}

/**
 * Asosiy hisoblash: maosh va joriy to'lovlar asosida
 * yangi kredit uchun mavjud oylik to'lov limitini topish.
 */
function calculateCredit(salary, existingMonthlyPayment) {
  const maxTotalDebt = salary * MAX_TOTAL_DEBT_MULTIPLIER;
  const maxMonthlyPayment = salary * MAX_MONTHLY_PAYMENT_RATIO;
  const availableForNewCredit = maxMonthlyPayment - existingMonthlyPayment;

  return {
    salary,
    maxTotalDebt,
    maxMonthlyPayment,
    existingPayment: existingMonthlyPayment,
    availableMonthly: Math.max(0, availableForNewCredit),
    hasAvailable: availableForNewCredit > 0,
  };
}

/**
 * Annuitet formulasi orqali, oylik to'lov asosida MAKSIMAL KREDIT SUMMASINI hisoblash.
 * P = Oylik_to'lov * ((1+r)^n - 1) / (r * (1+r)^n)
 */
function calculateMaxLoanAmount(monthlyPayment, months, annualRate) {
  if (monthlyPayment <= 0) return 0;
  const r = annualRate / 12;
  const factor = Math.pow(1 + r, months);
  return (monthlyPayment * (factor - 1)) / (r * factor);
}

/**
 * Berilgan kredit summasi, muddat va yillik stavka bo'yicha
 * doimiy (annuitet) oylik to'lovni hisoblash.
 */
function calculateAnnuityPayment(principal, months, annualRate) {
  const r = annualRate / 12;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/**
 * Barcha 3 muddat (12/24/36 oy) uchun maksimal kredit summalarini hisoblash.
 */
function calculateAllTermsOffers(monthlyPayment) {
  const offers = {};
  for (const [months, rate] of Object.entries(LOAN_TERMS)) {
    const maxAmount = calculateMaxLoanAmount(monthlyPayment, Number(months), rate);
    offers[months] = { rate, maxAmount, monthlyPayment };
  }
  return offers;
}

/**
 * To'liq amortizatsiya jadvalini tuzish.
 * Har bir oy uchun: to'lov, foiz qismi, asosiy qarz qismi, qolgan qarz.
 */
function buildAmortizationSchedule(principal, months, annualRate) {
  const r = annualRate / 12;
  const monthlyPayment = calculateAnnuityPayment(principal, months, annualRate);
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interestPart = balance * r;
    let principalPart = monthlyPayment - interestPart;
    balance -= principalPart;
    if (i === months || balance < 0) balance = 0;
    schedule.push({
      month: i,
      payment: monthlyPayment,
      interest: interestPart,
      principal: principalPart,
      balance,
    });
  }
  return schedule;
}

/**
 * Katta raqamlarni qisqa formatga keltirish (1234567 -> 1235k)
 */
function formatShort(number) {
  const n = Math.round(number);
  if (Math.abs(n) >= 1000) {
    return `${Math.round(n / 1000)}k`;
  }
  return String(n);
}

module.exports = {
  LOAN_TERMS,
  formatNumber,
  parseNumber,
  calculateCredit,
  calculateMaxLoanAmount,
  calculateAnnuityPayment,
  calculateAllTermsOffers,
  buildAmortizationSchedule,
  formatShort,
};
