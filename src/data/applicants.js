// Fixed demo dataset for Phase 1 & Phase 2 - Fictional applicants only
// Scores and details are strictly hardcoded and will not change.

export const APPLICANTS = [
  {
    id: "ALT-001",
    name: "Ramesh Kumar",
    occupation: "Sabzi Vendor",
    maskedPhone: "98XXXXXX10",
    maskedAccount: "XXXX1234",
    score: 762,
    tier: "Low Risk",
    decision: "Approve",
    loanAmount: "Rs. 50,000",
    onTimePayments: "12/12 bills on-time",
    latePayments: 0,
    bounces: 0,
    incomePattern: "Stable",
    avgMonthlyBalance: "Rs. 6,800",
    monthlyIncome: "Rs. 28,000 - Rs. 32,000 per month",
    timeline: [
      { month: "May", status: "On-time" },
      { month: "Jun", status: "On-time" },
      { month: "Jul", status: "On-time" },
      { month: "Aug", status: "On-time" },
      { month: "Sep", status: "On-time" },
      { month: "Oct", status: "On-time" }
    ],
    positiveFactors: [
      "12/12 bills paid on-time in the last 12 months",
      "Stable daily UPI income, no gap months",
      "Month-end balance rarely goes low"
    ],
    riskFactors: [
      "No formal credit history (CIBIL blank) — score is based on alternative data only"
    ],
    nextStep: "Proceed to KYC and disburse Rs. 50,000. Keep paying bills on-time to maintain the score."
  },
  {
    id: "ALT-002",
    name: "Sneha Verma",
    occupation: "Gig Delivery Partner",
    maskedPhone: "98XXXXXX22",
    maskedAccount: "XXXX5678",
    score: 621,
    tier: "Medium Risk",
    decision: "Human Review",
    loanAmount: "Rs. 25,000",
    onTimePayments: "9/12 bills on-time",
    latePayments: 2,
    bounces: 0,
    incomePattern: "Irregular",
    avgMonthlyBalance: "Rs. 2,400",
    monthlyIncome: "Rs. 15,000 - Rs. 28,000 per month (varies)",
    timeline: [
      { month: "May", status: "On-time" },
      { month: "Jun", status: "Late" },
      { month: "Jul", status: "On-time" },
      { month: "Aug", status: "On-time" },
      { month: "Sep", status: "On-time" },
      { month: "Oct", status: "On-time" }
    ],
    positiveFactors: [
      "Regular UPI income from gig work",
      "9/12 bills paid on-time in the last 12 months"
    ],
    riskFactors: [
      "2 bills paid late in the last 12 months",
      "Income varies month to month",
      "Month-end balance often goes low"
    ],
    nextStep: "Send to human review. Officer to verify income documents before approving Rs. 25,000."
  },
  {
    id: "ALT-003",
    name: "Vikram Singh",
    occupation: "Daily Wage Worker",
    maskedPhone: "98XXXXXX35",
    maskedAccount: "XXXX9012",
    score: 438,
    tier: "High Risk",
    decision: "Reject + Improvement Plan",
    loanAmount: "Not approved",
    onTimePayments: "5/12 bills on-time",
    latePayments: 5,
    bounces: 5,
    incomePattern: "Highly Irregular",
    avgMonthlyBalance: "Rs. 750",
    monthlyIncome: "Rs. 8,000 - Rs. 20,000 per month (highly irregular)",
    timeline: [
      { month: "May", status: "Late" },
      { month: "Jun", status: "On-time" },
      { month: "Jul", status: "Missed" },
      { month: "Aug", status: "Late" },
      { month: "Sep", status: "On-time" },
      { month: "Oct", status: "Late" }
    ],
    positiveFactors: [
      "Some months show regular UPI activity"
    ],
    riskFactors: [
      "Only 5/12 bills paid on-time in the last 12 months",
      "5 bill bounces in the last 12 months",
      "Spending often exceeds income near month-end",
      "Highly irregular income"
    ],
    nextStep: "Improvement plan: pay all bills on-time for 3 months, avoid bounces, and keep a minimum month-end balance. Re-apply after 3 months."
  },
  {
    id: "ALT-004",
    name: "Amit Verma",
    occupation: "Salaried Employee",
    maskedPhone: "98XXXXXX47",
    maskedAccount: "XXXX3456",
    score: 412,
    tier: "High Risk",
    decision: "Reject + Alternative Offer",
    loanAmount: "Requested Rs. 2,00,000 — Not approved",
    requestedLoan: "Rs. 2,00,000",
    monthlyIncome: "Rs. 50,000 per month",
    monthlyExpenses: "Rs. 48,000 per month",
    monthlySavings: "Rs. 2,000 per month",
    expenseRatio: "96%",
    onTimePayments: "10/12 bills on-time",
    latePayments: 2,
    bounces: 0,
    incomePattern: "Stable salary, but no surplus",
    avgMonthlyBalance: "Rs. 1,800",
    timeline: [
      { month: "May", status: "On-time" },
      { month: "Jun", status: "On-time" },
      { month: "Jul", status: "Late" },
      { month: "Aug", status: "On-time" },
      { month: "Sep", status: "On-time" },
      { month: "Oct", status: "On-time" }
    ],
    positiveFactors: [
      "Regular monthly salary credit of Rs. 50,000",
      "10/12 bills paid on-time in the last 12 months"
    ],
    riskFactors: [
      "Expense ratio 96% — Rs. 48,000 out of Rs. 50,000 is spent every month",
      "Only Rs. 2,000 saved per month, no buffer for EMI",
      "Rs. 2,00,000 loan EMI exceeds monthly savings at every tenure — 12 months approx. Rs. 17,770, 60 months approx. Rs. 4,449 at 12% illustrative interest",
      "Loan requested is 4x monthly income and 100x monthly savings"
    ],
    nextStep: "Reject Rs. 2,00,000 request. Alternative: up to approx. Rs. 32,000 at EMI Rs. 1,500 for 24 months at 12% illustrative interest, or re-apply after 3-6 months with lower expenses and higher savings."
  }
];

export const TIER_CONFIG = {
  "Low Risk": {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    dotColor: "bg-emerald-600",
    barColor: "bg-emerald-600",
    textColor: "text-emerald-600",
    fillColor: "#059669"
  },
  "Medium Risk": {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    dotColor: "bg-amber-500",
    barColor: "bg-amber-500",
    textColor: "text-amber-600",
    fillColor: "#d97706"
  },
  "High Risk": {
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    dotColor: "bg-rose-600",
    barColor: "bg-rose-600",
    textColor: "text-rose-600",
    fillColor: "#e11d48"
  }
};
