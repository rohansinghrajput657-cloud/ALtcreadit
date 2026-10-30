import React, { useState } from 'react';
import ScoreGauge from './ScoreGauge';
import { useCountUp } from '../utils/useCountUp';

export default function ApplicantCard({ applicant, index = 0, onClick, animTrigger = 0 }) {
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
    incomePattern
  } = applicant;

  // Stagger timing: Summary tiles take ~0-400ms.
  // Cards start in order: Ramesh @ 400ms, Sneha @ 650ms, Vikram @ 900ms, Amit @ 1150ms.
  const cardDelay = 400 + index * 250;
  const animDuration = 1600;

  // Parse numerical targets for count-up
  // On-time payments: e.g. "12/12 bills on-time" -> 12
  const onTimeMatch = onTimePayments.match(/^(\d+)\/(\d+)/);
  const targetOnTime = onTimeMatch ? parseInt(onTimeMatch[1], 10) : 0;
  const totalBills = onTimeMatch ? onTimeMatch[2] : '12';

  // Animated numbers
  const displayScore = useCountUp(score, animDuration, cardDelay, animTrigger, 0);
  const displayOnTime = useCountUp(targetOnTime, 1200, cardDelay + 100, animTrigger, 0);

  // Sync Score Gauge fill percentage from 0% to final (clamped 300 to 900)
  const minScore = 300;
  const maxScore = 900;
  const targetPercentage = Math.max(0, Math.min(100, ((score - minScore) / (maxScore - minScore)) * 100));
  const currentGaugePercentage = displayScore < minScore 
    ? (displayScore / minScore) * 5 // Subtle initial crawl before 300
    : ((displayScore - minScore) / (maxScore - minScore)) * 100;

  // Click ripple state
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRipple({ x, y, size, key: Date.now() });

    setTimeout(() => {
      if (onClick) onClick();
    }, 180);
  };

  // Tier border and hover glow styling
  const getTierClasses = (t) => {
    switch (t) {
      case 'Low Risk':
        return {
          leftBorder: 'border-l-[#0E7A4B]',
          hoverGlow: 'hover:shadow-[0_12px_28px_rgba(14,122,75,0.12)] hover:border-[#0E7A4B]/60'
        };
      case 'Medium Risk':
        return {
          leftBorder: 'border-l-[#B7791F]',
          hoverGlow: 'hover:shadow-[0_12px_28px_rgba(183,121,31,0.12)] hover:border-[#B7791F]/60'
        };
      case 'High Risk':
        return {
          leftBorder: 'border-l-[#C0392B]',
          hoverGlow: 'hover:shadow-[0_12px_28px_rgba(192,57,43,0.12)] hover:border-[#C0392B]/60'
        };
      default:
        return {
          leftBorder: 'border-l-[#B7791F]',
          hoverGlow: 'hover:shadow-[0_12px_28px_rgba(19,35,58,0.08)] hover:border-[#13233A]/40'
        };
    }
  };

  const tierStyles = getTierClasses(tier);

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      role="button"
      tabIndex={0}
      style={{ animationDelay: `${cardDelay * 0.7}ms` }}
      className={`anim-fade-up ripple-container bg-white rounded-[14px] border border-[#E3DFD6] border-l-[3px] ${tierStyles.leftBorder} cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.015] ${tierStyles.hoverGlow} focus:outline-none focus:ring-1 focus:ring-[#13233A]`}
    >
      {/* Click Ripple element */}
      {ripple && (
        <span
          key={ripple.key}
          className="ripple-circle"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E3DFD6]">
        {/* Left: Identity */}
        <div className="p-5 lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-mono font-medium text-[#667085] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#E3DFD6]">
                {id}
              </span>
              <span className="text-xs text-[#667085] font-medium">
                {occupation}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#13233A] tracking-tight">
              {name}
            </h3>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E3DFD6]/60 flex items-center gap-4 text-xs text-[#667085]">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                PHONE
              </span>
              <span className="font-mono text-[#13233A] text-xs">{maskedPhone}</span>
            </div>
            <div className="h-4 w-px bg-[#E3DFD6]" />
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                ACCOUNT
              </span>
              <span className="font-mono text-[#13233A] text-xs">{maskedAccount}</span>
            </div>
          </div>
        </div>

        {/* Centre: Score Gauge with Animated Count-up and Gauge Fill */}
        <div className="p-5 lg:col-span-5 flex flex-col justify-center">
          <ScoreGauge 
            score={score} 
            tier={tier} 
            displayScore={displayScore}
            fillPercentage={currentGaugePercentage}
          />
        </div>

        {/* Right: Decision, Loan Amount & Key Behavioural Stats */}
        <div className="p-5 lg:col-span-3 flex flex-col justify-between bg-white rounded-r-[14px]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              DECISION &amp; LOAN
            </span>
            <div className="mt-1">
              <div className="text-sm font-bold text-[#13233A] leading-tight">
                {decision}
              </div>
              <div className="text-xs font-semibold text-[#667085] mt-0.5">
                {loanAmount}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E3DFD6]/60 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                ON-TIME
              </span>
              <span className="font-medium text-[#13233A] text-[11px] tabular-nums">
                {displayOnTime}/{totalBills} bills on-time
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider block">
                PATTERN
              </span>
              <span className="font-medium text-[#13233A] text-[11px]">
                {incomePattern}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
