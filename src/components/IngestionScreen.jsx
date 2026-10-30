import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function IngestionScreen({
  onBackToConsent,
  onWithdrawConsent,
  onViewRameshScore,
  onBackToApplicants
}) {
  const [isParsed, setIsParsed] = useState(false);

  // Exact sample messages
  const sampleMessages = [
    { id: 1, label: 'SMS 1', text: 'Electricity bill Rs. 840 PAID on 05 Oct 2026.' },
    { id: 2, label: 'SMS 2', text: 'UPI: Rs. 2,500 received on 06 Oct 2026. Ref: XXXX1234' },
    { id: 3, label: 'SMS 3', text: 'Mobile recharge Rs. 299 successful on 07 Oct 2026.' },
    { id: 4, label: 'SMS 4', text: 'Rent payment Rs. 5,000 PAID on 01 Oct 2026.' }
  ];

  // Exact parsed rows
  const parsedRows = [
    { type: 'Electricity bill', amount: 'Rs. 840', status: 'On-time', isIncome: false },
    { type: 'UPI receipt', amount: 'Rs. 2,500', status: 'Regular income signal', isIncome: true },
    { type: 'Mobile recharge', amount: 'Rs. 299', status: 'On-time', isIncome: false },
    { type: 'Rent payment', amount: 'Rs. 5,000', status: 'On-time', isIncome: false }
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar: Back to Consent & Withdraw Consent Button & Demo Badge */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToConsent}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Consent</span>
          </button>

          <button
            type="button"
            onClick={onWithdrawConsent}
            className="px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#C0392B] bg-white border border-[#E3DFD6] hover:border-[#C0392B]/50 transition-colors"
          >
            Withdraw Consent
          </button>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-white text-[#667085] border border-[#E3DFD6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
          Demo Data — Fictional Applicants Only
        </span>
      </div>

      {/* Title & Subtitle Header */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13233A] tracking-tight">
          How Payment Behaviour Is Extracted
        </h2>
        <p className="text-sm text-[#667085] font-medium mt-1">
          Sample messages only — full phone and account numbers are never shown.
        </p>
      </div>

      {/* Main 2-Column Bento: Sample Messages (Left) vs Parsed Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Sample Messages */}
        <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#E3DFD6]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                INCOMING RAW DATA STREAM
              </span>
              <span className="text-[10px] font-mono text-[#667085] bg-[#F5F3EE] px-2 py-0.5 rounded border border-[#E3DFD6]">
                4 Sample SMS
              </span>
            </div>

            <div className="space-y-3">
              {sampleMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-[#F5F3EE]/60 rounded-[10px] p-3 border border-[#E3DFD6]"
                >
                  <span className="text-[10px] font-mono font-semibold text-[#667085] block mb-1">
                    {msg.label}
                  </span>
                  <p className="text-xs font-mono text-[#13233A] leading-relaxed">
                    "{msg.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Note under the cards */}
            <p className="text-[11px] text-[#667085] mt-4 pt-3 border-t border-[#E3DFD6]">
              Masked example for applicant 98XXXXXX10 / XXXX1234 (Ramesh Kumar, ALT-001).
            </p>
          </div>

          <div className="mt-5 pt-3">
            <button
              type="button"
              onClick={() => setIsParsed(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-[8px] text-xs font-semibold bg-[#13233A] text-white hover:bg-[#13233A]/90 transition-colors shadow-sm"
            >
              Parse Sample Messages
            </button>
          </div>
        </div>

        {/* Right Column: Parsed Output */}
        <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#E3DFD6]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                EXTRACTED PARSER OUTPUT
              </span>
              <span className="text-[10px] font-mono text-[#667085]">
                {isParsed ? 'Completed' : 'Waiting'}
              </span>
            </div>

            {!isParsed ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#F5F3EE]/40 rounded-[10px] border border-dashed border-[#E3DFD6]">
                <p className="text-xs font-medium text-[#667085]">
                  Parsed output will appear here.
                </p>
                <span className="text-[11px] text-[#667085]/70 mt-1">
                  Click "Parse Sample Messages" to view structured transactions
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E3DFD6] text-[#667085]">
                      <th className="py-2 px-2.5 font-semibold text-[10px] uppercase tracking-wider">Transaction Type</th>
                      <th className="py-2 px-2.5 font-semibold text-[10px] uppercase tracking-wider">Amount</th>
                      <th className="py-2 px-2.5 font-semibold text-[10px] uppercase tracking-wider">Extracted Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3DFD6]">
                    {parsedRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F5F3EE]/50 transition-colors">
                        <td className="py-2.5 px-2.5 font-medium text-[#13233A]">
                          {row.type}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono font-semibold text-[#13233A]">
                          {row.amount}
                        </td>
                        <td className="py-2.5 px-2.5">
                          <span className="inline-flex items-center gap-1.5 font-medium text-[#13233A]">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: row.isIncome ? '#0E7A4B' : '#0E7A4B' }}
                            />
                            <span>{row.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Features Extracted Box */}
          <div className="mt-5 pt-4 border-t border-[#E3DFD6] bg-[#F5F3EE]/60 rounded-[10px] p-3.5 border border-[#E3DFD6]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block mb-2">
              FEATURES EXTRACTED
            </span>
            <div className="space-y-1 text-xs text-[#13233A] leading-relaxed">
              <p>Sample result: 3/3 bills and payments on-time in this sample.</p>
              <p>Income signal: 1 UPI receipt in this sample.</p>
              <p className="text-[#667085] pt-1">
                Note: This sample does NOT recalculate any score. Ramesh Kumar's score stays at 762.
              </p>
              <p className="text-[#667085]">
                Full score uses 12-month behaviour, already shown on the detail page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons at the bottom */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={onViewRameshScore}
          className="px-4 py-2 rounded-[8px] text-xs font-semibold bg-[#13233A] text-white hover:bg-[#13233A]/90 transition-colors shadow-sm"
        >
          View Ramesh's Score
        </button>

        <button
          type="button"
          onClick={onBackToApplicants}
          className="px-4 py-2 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 transition-colors"
        >
          Back to Applicants
        </button>
      </div>
    </div>
  );
}

