import React from 'react';

/**
 * AffordabilityChart Component
 * Amit Verma (ALT-004) only:
 * EMI bars at 12% for Rs. 2,00,000 loan:
 * - 12m approx. Rs. 17,770
 * - 24m approx. Rs. 9,415
 * - 36m approx. Rs. 6,643
 * - 60m approx. Rs. 4,449
 * With a dashed red line at Rs. 2,000 monthly savings.
 * Every EMI bar is above the savings line.
 * Bars use navy-to-emerald light gradient only (linear-gradient(90deg, #13233A 0%, #0E7A4B 100%)).
 */
export default function AffordabilityChart() {
  const savings = 2000;
  const maxAxis = 20000; // Rs. 20,000 scale ceiling

  const emiData = [
    { tenure: '12 months', emi: 17770, label: 'approx. Rs. 17,770' },
    { tenure: '24 months', emi: 9415, label: 'approx. Rs. 9,415' },
    { tenure: '36 months', emi: 6643, label: 'approx. Rs. 6,643' },
    { tenure: '60 months', emi: 4449, label: 'approx. Rs. 4,449' }
  ];

  const savingsPct = (savings / maxAxis) * 100; // 10%

  return (
    <div className="p-4 bg-[#F5F3EE]/50 rounded-[14px] border border-[#E3DFD6] space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E3DFD6]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            LOAN SERVICEABILITY vs MONTHLY SAVINGS
          </span>
          <span className="text-xs font-bold text-[#13233A]">
            Rs. 2,00,000 Loan at 12% Illustrative Interest
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-4 h-0.5 border-b-2 border-dashed border-[#C0392B]" />
          <span className="font-semibold text-[#C0392B] font-mono text-[11px]">
            Savings Cap: Rs. 2,000/mo
          </span>
        </div>
      </div>

      {/* Horizontal Bar Chart with Savings Threshold Line */}
      <div className="relative pt-2 pb-6 space-y-3">
        {/* Vertical Dashed Red Line for Rs. 2,000 Savings */}
        <div
          className="absolute top-0 bottom-4 w-px border-l-2 border-dashed border-[#C0392B] z-20 pointer-events-none"
          style={{ left: `calc(100px + (100% - 100px) * ${savingsPct / 100})` }}
        >
          <span className="absolute -bottom-5 -translate-x-1/2 bg-[#C0392B] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            Surplus: Rs. 2,000
          </span>
        </div>

        {emiData.map((item, idx) => {
          const barWidthPct = (item.emi / maxAxis) * 100;

          return (
            <div key={item.tenure} className="flex items-center gap-3 text-xs">
              <span className="w-24 shrink-0 font-semibold text-[#13233A] text-right">
                {item.tenure}
              </span>

              <div className="flex-1 h-7 bg-[#EAE7DF] rounded-[6px] overflow-hidden relative flex items-center shadow-inner">
                {/* Light navy-to-emerald gradient bar */}
                <div
                  className="h-full rounded-[6px] transition-all duration-700 ease-out flex items-center justify-end pr-2 text-white font-mono text-[11px] font-bold shadow"
                  style={{
                    width: `${barWidthPct}%`,
                    background: 'linear-gradient(90deg, #13233A 0%, #0E7A4B 100%)',
                    transitionDelay: `${idx * 150}ms`
                  }}
                >
                  <span className="drop-shadow-sm">{item.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#667085] pt-2 border-t border-[#E3DFD6] font-mono">
        <span>Scale 0</span>
        <span>Rs. 5,000</span>
        <span>Rs. 10,000</span>
        <span>Rs. 15,000</span>
        <span>Rs. 20,000</span>
      </div>
    </div>
  );
}
