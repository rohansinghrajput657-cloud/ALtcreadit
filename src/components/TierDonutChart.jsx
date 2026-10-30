import React, { useState, useEffect } from 'react';

/**
 * TierDonutChart Component
 * Displays Low 1, Medium 1, High 2 (Total 4)
 * Colours: #0E7A4B, #B7791F, #C0392B only.
 * Animated drawing on load using strokeDashoffset, with labels on hover.
 */
export default function TierDonutChart({ animTrigger = 0 }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [progress, setProgress] = useState(0);

  // Locked values: Low 1, Medium 1, High 2 (Total 4)
  const data = [
    { label: 'Low Risk', count: 1, color: '#0E7A4B', range: '700–900', pct: 25 },
    { label: 'Medium Risk', count: 1, color: '#B7791F', range: '550–699', pct: 25 },
    { label: 'High Risk', count: 2, color: '#C0392B', range: '300–549', pct: 50 }
  ];

  const total = 4;
  const radius = 54;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~339.29

  useEffect(() => {
    setProgress(0);
    const timer = setTimeout(() => {
      setProgress(1);
    }, 120);
    return () => clearTimeout(timer);
  }, [animTrigger]);

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
      {/* SVG Donut */}
      <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          {/* Background circle track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#EAE7DF"
            strokeWidth={strokeWidth}
          />
          {data.map((slice) => {
            const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += slice.pct;

            const isHovered = hoveredSlice === slice.label;

            return (
              <circle
                key={slice.label}
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out cursor-pointer"
                style={{
                  opacity: progress,
                  transformOrigin: 'center',
                }}
                onMouseEnter={() => setHoveredSlice(slice.label)}
                onMouseLeave={() => setHoveredSlice(null)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-semibold text-[#667085] tracking-wider">
            {hoveredSlice ? hoveredSlice.replace(' Risk', '') : 'TOTAL'}
          </span>
          <span className="text-xl font-bold font-serif text-[#13233A] tabular-nums">
            {hoveredSlice ? data.find((d) => d.label === hoveredSlice)?.count : total}
          </span>
          <span className="text-[9px] text-[#667085]">
            {hoveredSlice ? data.find((d) => d.label === hoveredSlice)?.range : 'Applicants'}
          </span>
        </div>
      </div>

      {/* Legend & Details */}
      <div className="flex-1 w-full space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] pb-1 border-b border-[#E3DFD6]">
          TIER DISTRIBUTION
        </div>
        {data.map((item) => {
          const isHovered = hoveredSlice === item.label;
          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredSlice(item.label)}
              onMouseLeave={() => setHoveredSlice(null)}
              className={`flex items-center justify-between p-1.5 rounded-[6px] transition-all cursor-pointer ${
                isHovered ? 'bg-[#F5F3EE]' : 'hover:bg-[#F5F3EE]/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-[#13233A]">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#667085] font-mono">
                  ({item.range})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-[#13233A]">
                  {item.count}
                </span>
                <span className="text-[10px] text-[#667085] font-mono">
                  ({item.pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
