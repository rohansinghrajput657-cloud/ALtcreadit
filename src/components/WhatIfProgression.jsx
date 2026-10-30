import React from 'react';

/**
 * WhatIfProgression Component
 * Displays score progression as boxes are ticked:
 * Base -> +37 -> +65 -> +91
 * For example Sneha 621 -> 658 -> 686 -> 712, capped at 900.
 * Animates together when checkboxes are ticked/unticked.
 */
export default function WhatIfProgression({
  baseScore,
  whatIf1,
  whatIf2,
  whatIf3,
  currentSimulatedScore
}) {
  // Step 0: Base
  // Step 1: Base + 37 (if whatIf1)
  // Step 2: Base + 37 + 28 = +65 (if whatIf2)
  // Step 3: Base + 37 + 28 + 26 = +91 (if whatIf3)
  const steps = [
    { label: 'Base', pts: 0, target: baseScore, active: true },
    { label: '3-Mo Bills', pts: 37, target: Math.min(900, baseScore + 37), active: whatIf1 },
    { label: 'No Bounces', pts: 28, target: Math.min(900, baseScore + (whatIf1 ? 37 : 0) + 28), active: whatIf2 },
    { label: 'Stable Income', pts: 26, target: Math.min(900, baseScore + (whatIf1 ? 37 : 0) + (whatIf2 ? 28 : 0) + 26), active: whatIf3 },
  ];

  return (
    <div className="p-3.5 bg-[#F5F3EE]/60 rounded-[12px] border border-[#E3DFD6] space-y-2 mt-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">
          WHAT-IF PROGRESSION TRACKER
        </span>
        <span className="text-xs font-mono font-bold text-gradient-navy-emerald tabular-nums">
          Score: {currentSimulatedScore} / 900
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            className={`p-2 rounded-[8px] border transition-all duration-300 ${
              step.active
                ? 'bg-white border-[#0E7A4B] shadow-sm'
                : 'bg-white/40 border-[#E3DFD6] opacity-50'
            }`}
          >
            <span className="text-[9px] uppercase font-bold text-[#667085] block truncate">
              {step.label}
            </span>
            <span className="font-mono font-extrabold text-sm text-[#13233A] block mt-0.5">
              {step.target}
            </span>
            <span className="text-[9px] font-mono font-semibold text-[#0E7A4B] block">
              {step.pts === 0 ? 'Anchor' : `+${step.pts}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
