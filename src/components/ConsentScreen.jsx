import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ConsentScreen({ onBack, onConsentGiven, onDecline }) {
  // Section 1: 3 rows, all ON by default
  const [dataToggles, setDataToggles] = useState({
    sms: true,
    email: true,
    upi: true,
  });

  // Main consent checkbox: required, unchecked by default
  const [hasConsented, setHasConsented] = useState(false);

  const toggleRow = (key) => {
    setDataToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Back Button & Context Badge */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Applicants</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-white text-[#667085] border border-[#E3DFD6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
          Demo Data — Fictional Applicants Only
        </span>
      </div>

      {/* Title & Subtitle Header */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13233A] tracking-tight">
          Consent to Use Alternative Data
        </h2>
        <p className="text-sm text-[#667085] font-medium mt-1">
          Credit score without CIBIL, based on payment behaviour
        </p>
      </div>

      {/* Section 1 — "What will be used" */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-4 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            DATA SCOPE &amp; SOURCES
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            What will be used
          </h3>
        </div>

        <div className="divide-y divide-[#E3DFD6]">
          {/* Row 1: SMS bill alerts */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#13233A]">
                  SMS bill alerts
                </span>
                {!dataToggles.sms && (
                  <span className="text-[10px] font-semibold text-[#C0392B] bg-[#F5F3EE] px-1.5 py-0.5 rounded border border-[#E3DFD6]">
                    Not used
                  </span>
                )}
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Bill paid, late, or bounced alerts only
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={dataToggles.sms}
              onClick={() => toggleRow('sms')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dataToggles.sms ? 'bg-[#13233A]' : 'bg-[#E3DFD6]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dataToggles.sms ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Row 2: Email receipts */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#13233A]">
                  Email receipts
                </span>
                {!dataToggles.email && (
                  <span className="text-[10px] font-semibold text-[#C0392B] bg-[#F5F3EE] px-1.5 py-0.5 rounded border border-[#E3DFD6]">
                    Not used
                  </span>
                )}
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Bill and payment receipts only
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={dataToggles.email}
              onClick={() => toggleRow('email')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dataToggles.email ? 'bg-[#13233A]' : 'bg-[#E3DFD6]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dataToggles.email ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Row 3: UPI transactions */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#13233A]">
                  UPI transactions
                </span>
                {!dataToggles.upi && (
                  <span className="text-[10px] font-semibold text-[#C0392B] bg-[#F5F3EE] px-1.5 py-0.5 rounded border border-[#E3DFD6]">
                    Not used
                  </span>
                )}
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Payment regularity and balance pattern only
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={dataToggles.upi}
              onClick={() => toggleRow('upi')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dataToggles.upi ? 'bg-[#13233A]' : 'bg-[#E3DFD6]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dataToggles.upi ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 — "What will NEVER be used" */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            STRICT PRIVACY SAFEGUARDS
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            What will NEVER be used
          </h3>
        </div>

        <ul className="divide-y divide-[#E3DFD6]/70 text-xs text-[#13233A]">
          <li className="py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            <span>Contacts</span>
          </li>
          <li className="py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            <span>Photos</span>
          </li>
          <li className="py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            <span>Location</span>
          </li>
          <li className="py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            <span>Full phone number</span>
          </li>
          <li className="py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0392B]" />
            <span>Full bank account number</span>
          </li>
        </ul>
      </div>

      {/* Section 3 — "Purpose and limits" */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            TERMS &amp; RETENTION
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Purpose and limits
          </h3>
        </div>

        <div className="space-y-2 text-xs text-[#13233A] leading-relaxed">
          <p>Purpose: To assess creditworthiness for a loan application only.</p>
          <p>Duration: For this assessment only. This is a demo — no real data is stored.</p>
          <p>You can withdraw consent at any time from the next screen.</p>
        </div>
      </div>

      {/* Main Consent Checkbox & Action Buttons */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 space-y-5">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hasConsented}
            onChange={(e) => setHasConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#E3DFD6] text-[#13233A] focus:ring-[#13233A]"
          />
          <span className="text-xs sm:text-sm font-semibold text-[#13233A]">
            I understand what data will be used and I give consent for this demo assessment.
          </span>
        </label>

        <div className="flex items-center gap-3 pt-3 border-t border-[#E3DFD6] flex-wrap">
          <button
            type="button"
            disabled={!hasConsented}
            onClick={onConsentGiven}
            className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-colors ${
              hasConsented
                ? 'bg-[#13233A] text-white hover:bg-[#13233A]/90 cursor-pointer shadow-sm'
                : 'bg-[#E3DFD6] text-[#667085] cursor-not-allowed'
            }`}
          >
            Give Consent &amp; Continue
          </button>

          <button
            type="button"
            onClick={onDecline}
            className="px-4 py-2 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

