import React from 'react';

/**
 * Logo Component
 * A deep navy #13233A shield/circle with white outline and a gold #C9A86A check tick.
 * Next to serif wordmark "AltCredit".
 * No neon, no gradient logo, no lime.
 */
export default function Logo({ size = 'default', onClick }) {
  const isLarge = size === 'large';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''}`}
    >
      {/* Navy Shield with White Ring and Gold Check */}
      <div className={`relative flex items-center justify-center shrink-0 ${isLarge ? 'w-10 h-10' : 'w-9 h-9'} rounded-full bg-[#13233A] border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-200`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A86A"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isLarge ? 'w-5 h-5' : 'w-4 h-4'}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`font-serif font-bold tracking-tight text-[#13233A] ${isLarge ? 'text-3xl' : 'text-2xl sm:text-3xl'}`}>
          AltCredit
        </span>
        <span className="hidden sm:inline-block text-[#CCC8BE] font-light">|</span>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
          ALTERNATIVE CREDIT SCORING
        </span>
      </div>
    </div>
  );
}
