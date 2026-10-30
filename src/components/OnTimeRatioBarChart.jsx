import React, { useState, useEffect } from 'react';

/**
 * OnTimeRatioBarChart Component
 * Ramesh 12/12 (100%), Sneha 9/12 (75%), Vikram 5/12 (42%), Amit 10/12 (83%).
 * Bars animate from 0 to full width on load in the tier colour of each applicant,
 * with a light gradient to the same colour's lighter shade only:
 * - Emerald: #0E7A4B to #3AA76A
 * - Amber: #B7791F to #D49B44
 * - Red: #C0392B to #E05847
 */
export default function OnTimeRatioBarChart({ animTrigger = 0 }) {
  const [animated, setAnimated] = useState(false);

  const data = [
    {
      name: 'Ramesh Kumar',
      id: 'ALT-001',
      score: 762,
      tier: 'Low Risk',
      ratioText: '12/12',
      pct: 100,
      gradient: 'linear-gradient(90deg, #0E7A4B 0%, #3AA76A 100%)',
      badgeColor: '#0E7A4B'
    },
    {
      name: 'Sneha Verma',
      id: 'ALT-002',
      score: 621,
      tier: 'Medium Risk',
      ratioText: '9/12',
      pct: 75,
      gradient: 'linear-gradient(90deg, #B7791F 0%, #D49B44 100%)',
      badgeColor: '#B7791F'
    },
    {
      name: 'Vikram Singh',
      id: 'ALT-003',
      score: 438,
      tier: 'High Risk',
      ratioText: '5/12',
      pct: 42,
      gradient: 'linear-gradient(90deg, #C0392B 0%, #E05847 100%)',
      badgeColor: '#C0392B'
    },
    {
      name: 'Amit Verma',
      id: 'ALT-004',
      score: 412,
      tier: 'High Risk',
      ratioText: '10/12',
      pct: 83,
      gradient: 'linear-gradient(90deg, #C0392B 0%, #E05847 100%)',
      badgeColor: '#C0392B'
    }
  ];

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [animTrigger]);

  return (
    <div className="p-4 space-y-3.5">
      <div className="flex items-center justify-between pb-1 border-b border-[#E3DFD6]">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
          12-MONTH ON-TIME BILL CLEARANCE RATIO
        </span>
        <span className="text-[10px] text-[#667085] font-mono">
          Normalized %
        </span>
      </div>

      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.badgeColor }}
                />
                <span className="font-semibold text-[#13233A]">{item.name}</span>
                <span className="text-[10px] font-mono text-[#667085]">({item.id})</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold text-[#13233A]">{item.ratioText}</span>
                <span className="text-[11px] text-[#667085]">({item.pct}%)</span>
              </div>
            </div>

            {/* Bar Track */}
            <div className="h-2.5 w-full bg-[#EAE7DF] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${item.pct}%` : '0%',
                  background: item.gradient,
                  transitionDelay: `${idx * 120}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
