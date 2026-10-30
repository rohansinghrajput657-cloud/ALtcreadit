import React from 'react';

/**
 * ScoreGauge Component
 * Restyled with Finance Bento inspired density:
 * - 300-900 scale
 * - Solid tier colour for filled segment (no gradient)
 * - Clear dot marker at exact score
 * - Big tabular numbers with small uppercase micro-label
 * - Tick marks at 300, 550, 700, 900
 * - Supports animated fill width & score count-up
 */
export default function ScoreGauge({ 
  score, 
  tier, 
  showHeader = true,
  displayScore = null,
  fillPercentage = null 
}) {
  const minScore = 300;
  const maxScore = 900;
  
  // Value to display numerically
  const currentNum = displayScore !== null ? displayScore : score;
  const clampedScore = Math.max(minScore, Math.min(maxScore, currentNum));
  
  // Progress bar percentage (either driven directly by fillPercentage or calculated from currentNum)
  const defaultPercentage = ((clampedScore - minScore) / (maxScore - minScore)) * 100;
  const finalPercentage = fillPercentage !== null ? Math.max(0, Math.min(100, fillPercentage)) : defaultPercentage;

  const tick550Pos = ((550 - minScore) / (maxScore - minScore)) * 100; // 41.67%
  const tick700Pos = ((700 - minScore) / (maxScore - minScore)) * 100; // 66.67%

  // Solid tier colors (strictly no gradients)
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

  const tierColor = getTierColor(tier);

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex items-baseline justify-between mb-2.5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              ALTERNATIVE CREDIT SCORE
            </span>
            <div className="flex items-baseline mt-0.5">
              <span className="text-3xl font-bold tracking-tight text-[#13233A] tabular-nums transition-none">
                {currentNum}
              </span>
              <span className="text-xs text-[#667085] font-normal ml-1.5">/ 900</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-1">
              RISK ASSESSMENT
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#E3DFD6] bg-white text-xs font-semibold text-[#13233A]">
              <span 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: tierColor }}
              />
              {tier}
            </span>
          </div>
        </div>
      )}

      {/* Visual Track */}
      <div className="relative pt-2 pb-5">
        {/* Track Background */}
        <div className="h-2 w-full bg-[#EAE7DF] rounded-full overflow-hidden relative">
          {/* Solid Tier Filled Segment with smooth animated transition */}
          <div 
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{ 
              width: `${finalPercentage}%`,
              backgroundColor: tierColor
            }}
          />
        </div>

        {/* Clear Dot Marker at exact score */}
        <div 
          className="absolute top-[8px] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-150 ease-out"
          style={{ left: `${finalPercentage}%` }}
        >
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
            style={{ backgroundColor: tierColor }}
          />
        </div>

        {/* Tick Marks & Labels at 300, 550, 700, 900 */}
        <div className="relative w-full text-[10px] text-[#667085] font-medium mt-2 tabular-nums">
          <span className="absolute left-0">
            <span className="block h-1 w-px bg-[#CCC8BE] mb-0.5" />
            300
          </span>
          <span 
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${tick550Pos}%` }}
          >
            <span className="block h-1 w-px bg-[#CCC8BE] mx-auto mb-0.5" />
            550
          </span>
          <span 
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${tick700Pos}%` }}
          >
            <span className="block h-1 w-px bg-[#CCC8BE] mx-auto mb-0.5" />
            700
          </span>
          <span className="absolute right-0 text-right">
            <span className="block h-1 w-px bg-[#CCC8BE] ml-auto mb-0.5" />
            900
          </span>
        </div>
      </div>
    </div>
  );
}
