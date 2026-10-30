import React from 'react';

/**
 * ScoreGauge Component
 * Redesigned in Approved Light Premium Look:
 * - 300 to 900 scale with ticks at 300, 550, 700, 900
 * - Filling from 0 to final score on load, number counting up in sync
 * - Gauge fill uses applicant's tier colour with light gradient to the SAME colour's lighter shade only:
 *   Low Risk: #0E7A4B to #3AA76A
 *   Medium Risk: #B7791F to #D49B44
 *   High Risk: #C0392B to #E05847
 * - Big score numbers (48px+ on cards, 72px+ on detail hero) using text-gradient-navy-emerald
 */
export default function ScoreGauge({ 
  score, 
  tier, 
  showHeader = true,
  displayScore = null,
  fillPercentage = null,
  isHero = false
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

  // Light gradients strictly to the SAME colour's lighter shade only
  const getTierGradient = (t) => {
    switch (t) {
      case 'Low Risk':
        return 'linear-gradient(90deg, #0E7A4B 0%, #3AA76A 100%)';
      case 'Medium Risk':
        return 'linear-gradient(90deg, #B7791F 0%, #D49B44 100%)';
      case 'High Risk':
        return 'linear-gradient(90deg, #C0392B 0%, #E05847 100%)';
      default:
        return 'linear-gradient(90deg, #B7791F 0%, #D49B44 100%)';
    }
  };

  const getTierDotColor = (t) => {
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

  const tierGradient = getTierGradient(tier);
  const tierDotColor = getTierDotColor(tier);

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
              ALTERNATIVE CREDIT SCORE
            </span>
            <div className="flex items-baseline mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-gradient-navy-emerald tabular-nums">
                {currentNum}
              </span>
              <span className="text-sm text-[#667085] font-medium ml-1.5">/ 900</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-1">
              ASSESSMENT TIER
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E3DFD6] bg-white text-xs font-semibold text-[#13233A] shadow-sm">
              <span 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: tierDotColor }}
              />
              {tier}
            </span>
          </div>
        </div>
      )}

      {/* Visual Track */}
      <div className={`relative ${isHero ? 'pt-4 pb-6' : 'pt-2 pb-5'}`}>
        {/* Track Background */}
        <div className={`${isHero ? 'h-3.5' : 'h-2.5'} w-full bg-[#EAE7DF] rounded-full overflow-hidden relative shadow-inner`}>
          {/* Solid Tier Filled Segment with smooth animated transition & light gradient */}
          <div 
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{ 
              width: `${finalPercentage}%`,
              background: tierGradient
            }}
          />
        </div>

        {/* Clear Dot / Pin Marker at exact score */}
        <div 
          className={`absolute ${isHero ? 'top-[16px]' : 'top-[10px]'} -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-150 ease-out`}
          style={{ left: `${finalPercentage}%` }}
        >
          <div 
            className={`${isHero ? 'w-5 h-5 border-[3px]' : 'w-4 h-4 border-2'} rounded-full border-white shadow-md flex items-center justify-center`}
            style={{ backgroundColor: tierDotColor }}
          />
        </div>

        {/* Tick Marks & Labels at 300, 550, 700, 900 */}
        <div className="relative w-full text-[10px] text-[#667085] font-medium mt-2.5 tabular-nums">
          <span className="absolute left-0">
            <span className="block h-1.5 w-px bg-[#CCC8BE] mb-0.5" />
            300
          </span>
          <span 
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${tick550Pos}%` }}
          >
            <span className="block h-1.5 w-px bg-[#CCC8BE] mx-auto mb-0.5" />
            550
          </span>
          <span 
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${tick700Pos}%` }}
          >
            <span className="block h-1.5 w-px bg-[#CCC8BE] mx-auto mb-0.5" />
            700
          </span>
          <span className="absolute right-0 text-right">
            <span className="block h-1.5 w-px bg-[#CCC8BE] ml-auto mb-0.5" />
            900
          </span>
        </div>
      </div>
    </div>
  );
}
