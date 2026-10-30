import React, { useState, useEffect } from 'react';
import ScoreGauge from './ScoreGauge';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useCountUp } from '../utils/useCountUp';

export default function ApplicantDetail({ applicant, onBack }) {
  const {
    id,
    name,
    occupation,
    maskedPhone,
    maskedAccount,
    score,
    tier,
    decision,
    loanAmount,
    onTimePayments,
    latePayments,
    bounces,
    avgMonthlyBalance,
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    expenseRatio,
    timeline,
    positiveFactors,
    riskFactors,
    nextStep
  } = applicant;

  // Detail Score counts up from 0 to final score on page open
  const detailDisplayScore = useCountUp(score, 1400, 150, 0, 0);

  // Parse numerical metrics for count-up
  const onTimeCount = parseInt(onTimePayments, 10) || 0;
  const avgBalNum = parseInt(avgMonthlyBalance.replace(/[^\d]/g, ''), 10) || 0;
  const displayOnTime = useCountUp(onTimeCount, 1100, 250, 0, 0);
  const displayLate = useCountUp(latePayments, 1000, 300, 0, 0);
  const displayBounces = useCountUp(bounces, 1000, 350, 0, 0);
  const displayAvgBal = useCountUp(avgBalNum, 1300, 400, 0, 0);

  // What-If Simulator state (all unchecked by default, resets when component remounts)
  const [whatIf1, setWhatIf1] = useState(false);
  const [whatIf2, setWhatIf2] = useState(false);
  const [whatIf3, setWhatIf3] = useState(false);

  // Exact What-If formula: 37 + 28 + 26, capped at 900
  let additionalPoints = 0;
  if (whatIf1) additionalPoints += 37;
  if (whatIf2) additionalPoints += 28;
  if (whatIf3) additionalPoints += 26;

  const targetSimulatedScore = Math.min(900, score + additionalPoints);

  // Smooth What-If transition: count up or down smoothly whenever checkboxes change
  const [animatedSimScore, setAnimatedSimScore] = useState(targetSimulatedScore);

  useEffect(() => {
    let frameId;
    const startTime = performance.now();
    const duration = 500; // Snappy half-second smooth count transition
    const startVal = animatedSimScore;
    const diff = targetSimulatedScore - startVal;

    if (diff === 0) return;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + diff * ease);

      setAnimatedSimScore(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setAnimatedSimScore(targetSimulatedScore);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [targetSimulatedScore]);

  const getSimulatedTier = (s) => {
    if (s >= 700) return 'Low Risk';
    if (s >= 550) return 'Medium Risk';
    return 'High Risk';
  };

  const getSimulatedDecision = (t) => {
    if (t === 'Low Risk') return 'Approve';
    if (t === 'Medium Risk') return 'Human Review';
    return 'Reject + Improvement Plan';
  };

  const simulatedTier = getSimulatedTier(targetSimulatedScore);
  const simulatedDecision = getSimulatedDecision(simulatedTier);

  const handleResetWhatIf = () => {
    setWhatIf1(false);
    setWhatIf2(false);
    setWhatIf3(false);
  };

  // Solid tier colors strictly for dot, gauge, and 3px left edge
  const getTierColor = (t) => {
    switch (t) {
      case 'Low Risk':
        return '#0E7A4B';
      case 'Medium Risk':
        return '#B7791F';
      case 'High Risk':
        return '#C0392B';
      default:
        return '#B7791F';
    }
  };

  const getTierLeftBorder = (t) => {
    switch (t) {
      case 'Low Risk':
        return 'border-l-[#0E7A4B]';
      case 'Medium Risk':
        return 'border-l-[#B7791F]';
      case 'High Risk':
        return 'border-l-[#C0392B]';
      default:
        return 'border-l-[#B7791F]';
    }
  };

  const getTimelineStatusColor = (status) => {
    switch (status) {
      case 'On-time':
        return '#0E7A4B';
      case 'Late':
        return '#B7791F';
      case 'Missed':
        return '#C0392B';
      default:
        return '#667085';
    }
  };

  const tierColor = getTierColor(tier);
  const tierBorderClass = getTierLeftBorder(tier);
  const simulatedTierColor = getTierColor(simulatedTier);

  // Sync Score Gauge fill percentage for detail hero
  const minScore = 300;
  const maxScore = 900;
  const currentDetailGaugePct = detailDisplayScore < minScore
    ? (detailDisplayScore / minScore) * 5
    : ((detailDisplayScore - minScore) / (maxScore - minScore)) * 100;

  return (
    <div className="space-y-6 view-enter-slide">
      {/* Top Bar: Back Button & Context Badge */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-interactive inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Applicants</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-white text-[#667085] border border-[#E3DFD6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
          Demo Data — Fictional Applicants Only
        </span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 transition-all duration-300 hover:shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-[#E3DFD6]">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13233A] tracking-tight">
                {name}
              </h2>
              <span className="text-xs font-mono font-medium text-[#667085] bg-[#F5F3EE] px-2.5 py-0.5 rounded border border-[#E3DFD6]">
                {id}
              </span>
            </div>
            <p className="text-sm text-[#667085] font-medium mt-1">
              {occupation}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                MASKED PHONE
              </span>
              <span className="font-mono text-[#13233A] font-medium">{maskedPhone}</span>
            </div>
            <div className="h-6 w-px bg-[#E3DFD6]" />
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                MASKED ACCOUNT
              </span>
              <span className="font-mono text-[#13233A] font-medium">{maskedAccount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Asymmetric Bento Grid (Score Hero tile [2 cols] + Key Stats Stack [1 col]) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Hero Tile (spans 2 cols) */}
        <div className={`lg:col-span-2 bg-white rounded-[14px] border border-[#E3DFD6] border-l-[3px] ${tierBorderClass} p-6 flex flex-col justify-between shadow-[0_2px_8px_rgba(19,35,58,0.03)] hover:shadow-md transition-shadow duration-300`}>
          <div>
            <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[#E3DFD6]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
                  ALTERNATIVE CREDIT ASSESSMENT
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold tracking-tight text-[#13233A] tabular-nums">
                    {detailDisplayScore}
                  </span>
                  <span className="text-sm text-[#667085] font-normal">/ 900</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-semibold bg-white border border-[#E3DFD6] text-[#13233A]">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: tierColor }}
                  />
                  {tier}
                </span>
                <span className="text-xs font-semibold text-[#13233A]">
                  Decision: <span className="font-bold">{decision}</span>
                </span>
                <span className="text-[11px] text-[#667085]">
                  Loan: {loanAmount}
                </span>
              </div>
            </div>

            {/* Score Gauge */}
            <div className="pt-2">
              <ScoreGauge 
                score={score} 
                tier={tier} 
                showHeader={false} 
                displayScore={detailDisplayScore}
                fillPercentage={currentDetailGaugePct}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E3DFD6] text-xs text-[#667085] flex items-center justify-between flex-wrap gap-2">
            <span>Score Range: 300 to 900</span>
            <span>Higher score reflects lower default risk</span>
          </div>
        </div>

        {/* Key Stats Stack (spans 1 col, hairline dividers, big tabular numbers) */}
        <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 flex flex-col justify-between hover:border-[#13233A]/30 transition-colors duration-200">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-3 pb-2 border-b border-[#E3DFD6]">
              FINANCIAL METRICS
            </span>

            <div className="divide-y divide-[#E3DFD6]">
              <div className="py-2.5 flex items-baseline justify-between">
                <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                  ON-TIME BILLS
                </span>
                <span className="text-base font-bold text-[#13233A] tabular-nums">
                  {displayOnTime}/12 bills on-time
                </span>
              </div>

              <div className="py-2.5 flex items-baseline justify-between">
                <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                  LATE PAYMENTS
                </span>
                <span className="text-base font-bold text-[#13233A] tabular-nums">
                  {displayLate}
                </span>
              </div>

              <div className="py-2.5 flex items-baseline justify-between">
                <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                  BOUNCES
                </span>
                <span className="text-base font-bold text-[#13233A] tabular-nums">
                  {displayBounces}
                </span>
              </div>

              <div className="py-2.5 flex items-baseline justify-between">
                <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                  AVG MONTHLY BAL.
                </span>
                <span className="text-base font-bold text-[#13233A] tabular-nums">
                  Rs. {displayAvgBal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Extra rows only for applicants with detailed expense breakdown (ALT-004) */}
              {monthlyExpenses && (
                <div className="py-2.5 flex items-baseline justify-between anim-fade-up">
                  <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                    MONTHLY EXPENSES
                  </span>
                  <span className="text-base font-bold text-[#13233A] tabular-nums">
                    {monthlyExpenses}
                  </span>
                </div>
              )}

              {monthlySavings && (
                <div className="py-2.5 flex items-baseline justify-between anim-fade-up">
                  <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                    MONTHLY SAVINGS
                  </span>
                  <span className="text-base font-bold text-[#13233A] tabular-nums">
                    {monthlySavings}
                  </span>
                </div>
              )}

              {expenseRatio && (
                <div className="py-2.5 flex items-baseline justify-between anim-fade-up">
                  <span className="text-[11px] uppercase font-semibold text-[#667085] tracking-wider">
                    EXPENSE RATIO
                  </span>
                  <span className="text-base font-bold text-[#C0392B] tabular-nums">
                    {expenseRatio}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E3DFD6] mt-2">
            <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
              {monthlyExpenses ? "MONTHLY INCOME" : "ESTIMATED INCOME"}
            </span>
            <span className="text-xs font-semibold text-[#13233A] block mt-0.5">
              {monthlyIncome}
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Payment Timeline as a Ledger Table (Chronological Stagger Animation) */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            HISTORICAL BEHAVIOUR
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Payment Timeline — Last 6 Months (May-Oct 2026)
          </h3>
        </div>

        {/* Ledger Table with staggered chronological row entrance */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E3DFD6] text-[#667085]">
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">Month</th>
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">Period</th>
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">Clearance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DFD6]">
              {timeline.map((item, index) => {
                const dotColor = getTimelineStatusColor(item.status);
                return (
                  <tr 
                    key={item.month} 
                    style={{ animationDelay: `${200 + index * 180}ms` }}
                    className="anim-slide-left hover:bg-[#F5F3EE]/60 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-semibold text-[#13233A]">
                      {item.month}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[#667085]">
                      {item.month} 2026
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#13233A]">
                      <span className="inline-flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0" 
                          style={{ backgroundColor: dotColor }}
                        />
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Two Factor Lists Side by Side (Staggered after Timeline) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: What is helping the score (+ marks) */}
        <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-1">
              POSITIVE BEHAVIOURAL SIGNALS
            </span>
            <h4 className="text-sm font-bold text-[#13233A] mb-3 pb-2 border-b border-[#E3DFD6]">
              What is helping the score
            </h4>

            <ul className="divide-y divide-[#E3DFD6]/70">
              {positiveFactors.map((factor, index) => (
                <li 
                  key={index} 
                  style={{ animationDelay: `${1100 + index * 160}ms` }}
                  className="anim-slide-left py-2.5 flex items-start gap-2.5 text-xs text-[#13233A]"
                >
                  <span className="font-mono font-bold text-[#0E7A4B] text-sm shrink-0 leading-none mt-0.5">
                    +
                  </span>
                  <span className="leading-relaxed">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: What is lowering the score (- marks) */}
        <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-1">
              RISK FACTORS &amp; GAPS
            </span>
            <h4 className="text-sm font-bold text-[#13233A] mb-3 pb-2 border-b border-[#E3DFD6]">
              What is lowering the score
            </h4>

            <ul className="divide-y divide-[#E3DFD6]/70">
              {riskFactors.map((factor, index) => (
                <li 
                  key={index} 
                  style={{ animationDelay: `${1200 + index * 160}ms` }}
                  className="anim-slide-left py-2.5 flex items-start gap-2.5 text-xs text-[#13233A]"
                >
                  <span className="font-mono font-bold text-[#C0392B] text-sm shrink-0 leading-none mt-0.5">
                    −
                  </span>
                  <span className="leading-relaxed">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 3.5: Affordability Check Section (Phase 6) */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            LOAN SERVICEABILITY &amp; CASH FLOW
          </span>
          <h4 className="text-base font-bold text-[#13233A] mt-0.5">
            Affordability Check
          </h4>
        </div>

        {id === 'ALT-004' ? (
          <div className="space-y-4">
            {/* Income, Expenses, Savings, Expense Ratio Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F5F3EE]/60 rounded-[10px] p-3.5 border border-[#E3DFD6]">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  INCOME
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#13233A] mt-0.5 block">
                  Rs. 50,000
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  EXPENSES
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#13233A] mt-0.5 block">
                  Rs. 48,000
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  SAVINGS
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#13233A] mt-0.5 block">
                  Rs. 2,000
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  EXPENSE RATIO
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#C0392B] mt-0.5 block">
                  96%
                </span>
              </div>
            </div>

            {/* EMI Table at 12% illustrative interest for Rs. 2,00,000 loan */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-1.5">
                EMI TABLE AT 12% ILLUSTRATIVE INTEREST FOR RS. 2,00,000 LOAN
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E3DFD6] text-[#667085]">
                      <th className="py-2 px-3 font-semibold text-[10px] uppercase tracking-wider">Tenure</th>
                      <th className="py-2 px-3 font-semibold text-[10px] uppercase tracking-wider">Estimated Monthly EMI</th>
                      <th className="py-2 px-3 font-semibold text-[10px] uppercase tracking-wider">EMI vs Monthly Savings (Rs. 2,000)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3DFD6]">
                    <tr className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#13233A]">12 months</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#13233A]">approx. Rs. 17,770</td>
                      <td className="py-2.5 px-3 font-medium text-[#C0392B]">Exceeds surplus by Rs. 15,770</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#13233A]">24 months</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#13233A]">approx. Rs. 9,415</td>
                      <td className="py-2.5 px-3 font-medium text-[#C0392B]">Exceeds surplus by Rs. 7,415</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#13233A]">36 months</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#13233A]">approx. Rs. 6,643</td>
                      <td className="py-2.5 px-3 font-medium text-[#C0392B]">Exceeds surplus by Rs. 4,643</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#13233A]">60 months</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#13233A]">approx. Rs. 4,449</td>
                      <td className="py-2.5 px-3 font-medium text-[#C0392B]">Exceeds surplus by Rs. 2,449</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verdict and Alternative */}
            <div className="space-y-2 pt-2 border-t border-[#E3DFD6]">
              <div className="p-3 bg-[#F5F3EE]/60 rounded-[8px] border border-[#E3DFD6]">
                <span className="text-[10px] uppercase font-semibold text-[#C0392B] tracking-wider block mb-0.5">
                  VERDICT
                </span>
                <p className="text-xs font-semibold text-[#13233A]">
                  Not affordable at any tenure — every EMI exceeds Rs. 2,000 monthly savings.
                </p>
              </div>

              <div className="p-3 bg-white rounded-[8px] border border-[#E3DFD6]">
                <span className="text-[10px] uppercase font-semibold text-[#0E7A4B] tracking-wider block mb-0.5">
                  COUNTER-OFFER GUIDANCE
                </span>
                <p className="text-xs text-[#13233A] font-medium leading-relaxed">
                  Alternative: up to approx. Rs. 32,000 at EMI Rs. 1,500 for 24 months at 12% illustrative interest.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-xs flex-wrap">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  REQUESTED LOAN
                </span>
                <span className="font-semibold text-[#13233A] mt-0.5 block">
                  {loanAmount}
                </span>
              </div>
              <div className="h-6 w-px bg-[#E3DFD6]" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                  SYSTEM DECISION
                </span>
                <span className="font-semibold text-[#13233A] mt-0.5 block">
                  {decision}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#667085] pt-2 border-t border-[#E3DFD6] leading-relaxed">
              Affordability assessed from balance and income pattern already shown above. No expense figure is invented for this applicant in this demo.
            </p>
          </div>
        )}
      </div>

      {/* Row 4: Decision Strip */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-2">
          RECOMMENDED NEXT STEPS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-[#E3DFD6] pt-2">
          <div className="sm:col-span-4 pb-3 sm:pb-0 sm:pr-6">
            <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
              FINAL DECISION
            </span>
            <div className="text-base font-bold text-[#13233A] mt-1">
              {decision}
            </div>
            <div className="text-xs text-[#667085] font-medium mt-0.5">
              Eligible Amount: <span className="text-[#13233A] font-semibold">{loanAmount}</span>
            </div>
          </div>

          <div className="sm:col-span-8 pt-3 sm:pt-0 sm:pl-6">
            <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
              ACTION PLAN
            </span>
            <p className="text-xs sm:text-sm text-[#13233A] font-medium leading-relaxed mt-1">
              {nextStep}
            </p>
          </div>
        </div>
      </div>

      {/* Row 5: What-If Simulator Section (Phase 4 & Animated) */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4 pb-3 border-b border-[#E3DFD6]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              BEHAVIOURAL PROJECTION
            </span>
            <h3 className="text-xl font-serif font-bold text-[#13233A] mt-0.5">
              What-If Simulator
            </h3>
            <p className="text-xs text-[#667085] mt-0.5">
              Illustrative only — this does NOT change the real score.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetWhatIf}
            className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset What-If</span>
          </button>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 3 Checkboxes */}
          <div className="lg:col-span-6 space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-[10px] bg-[#F5F3EE]/60 border border-[#E3DFD6] cursor-pointer select-none transition-all hover:border-[#13233A]/40 hover:bg-[#F5F3EE]">
              <input
                type="checkbox"
                checked={whatIf1}
                onChange={(e) => setWhatIf1(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#E3DFD6] text-[#13233A] focus:ring-[#13233A]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#13233A]">
                    Pay all bills on-time for the next 3 months
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#0E7A4B] bg-white px-2 py-0.5 rounded border border-[#E3DFD6] shrink-0">
                    +37 pts
                  </span>
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-[10px] bg-[#F5F3EE]/60 border border-[#E3DFD6] cursor-pointer select-none transition-all hover:border-[#13233A]/40 hover:bg-[#F5F3EE]">
              <input
                type="checkbox"
                checked={whatIf2}
                onChange={(e) => setWhatIf2(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#E3DFD6] text-[#13233A] focus:ring-[#13233A]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#13233A]">
                    No new late payments or bounces for 6 months
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#0E7A4B] bg-white px-2 py-0.5 rounded border border-[#E3DFD6] shrink-0">
                    +28 pts
                  </span>
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-[10px] bg-[#F5F3EE]/60 border border-[#E3DFD6] cursor-pointer select-none transition-all hover:border-[#13233A]/40 hover:bg-[#F5F3EE]">
              <input
                type="checkbox"
                checked={whatIf3}
                onChange={(e) => setWhatIf3(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#E3DFD6] text-[#13233A] focus:ring-[#13233A]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#13233A]">
                    Keep monthly income stable, no gap months
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#0E7A4B] bg-white px-2 py-0.5 rounded border border-[#E3DFD6] shrink-0">
                    +26 pts
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Right Column: Base Score vs Animated Simulated Score */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#F5F3EE]/40 rounded-[10px] p-4 border border-[#E3DFD6]">
            <div>
              {/* Scores Comparison Strip */}
              <div className="grid grid-cols-2 divide-x divide-[#E3DFD6] pb-3 mb-3 border-b border-[#E3DFD6]">
                {/* Base Score */}
                <div className="pr-3">
                  <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                    BASE SCORE
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-bold text-[#13233A] tabular-nums">
                      {score}
                    </span>
                    <span className="text-xs text-[#667085]">/ 900</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#667085] mt-1">
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: tierColor }}
                    />
                    {tier}
                  </span>
                </div>

                {/* Animated Simulated Score */}
                <div className="pl-3">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                      SIMULATED SCORE
                    </span>
                    {additionalPoints > 0 && (
                      <span className="font-mono text-[11px] font-bold text-[#0E7A4B] anim-pop">
                        +{additionalPoints}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-bold text-[#13233A] tabular-nums transition-none">
                      {animatedSimScore}
                    </span>
                    <span className="text-xs text-[#667085]">/ 900</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span 
                      key={simulatedTier}
                      className="anim-pop inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#13233A]"
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: simulatedTierColor }}
                      />
                      {simulatedTier}
                    </span>
                    <span className="text-[11px] text-[#667085]">
                      ({simulatedDecision})
                    </span>
                  </div>
                </div>
              </div>

              {/* Reused ScoreGauge for Simulated Score */}
              <div className="pt-1">
                <ScoreGauge 
                  score={targetSimulatedScore} 
                  tier={simulatedTier} 
                  showHeader={false}
                  displayScore={animatedSimScore}
                />
              </div>
            </div>

            <p className="text-[11px] text-[#667085] mt-2 pt-2 border-t border-[#E3DFD6]">
              Loan amount is unchanged in this demo. Simulated score is for explanation only.
            </p>
          </div>
        </div>
      </div>

      {/* Row 6: Decision Audit Log Section */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-4 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            IMMUTABLE AUDIT TRAIL
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Decision Audit Log
          </h3>
        </div>

        <div className="divide-y divide-[#E3DFD6] text-xs">
          <div className="py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <span className="font-mono text-[#13233A]">
              29 Oct 2026 — Score calculated from alternative data: <strong className="font-semibold">{score}</strong>
            </span>
            <span className="font-mono text-[10px] uppercase font-semibold text-[#667085] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#E3DFD6]">
              System
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <span className="font-mono text-[#13233A]">
              29 Oct 2026 — Tier assigned: <strong className="font-semibold">{tier}</strong>
            </span>
            <span className="font-mono text-[10px] uppercase font-semibold text-[#667085] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#E3DFD6]">
              System
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-3 flex-wrap">
            <span className="font-mono text-[#13233A]">
              30 Oct 2026 — Decision suggested: <strong className="font-semibold">{decision}</strong>
            </span>
            <span className="font-mono text-[10px] uppercase font-semibold text-[#667085] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#E3DFD6]">
              System
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
