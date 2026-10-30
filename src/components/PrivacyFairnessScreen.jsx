import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PrivacyFairnessScreen({ onBack }) {
  // Section 1: PII Masking Table rows
  const piiRows = [
    { item: 'Phone number', status: 'Full number hidden', display: 'Shown as 98XXXXXX10' },
    { item: 'Bank account', status: 'Full number hidden', display: 'Shown as XXXX1234' },
    { item: 'Applicant identity in model', status: 'Name not used as a model input', display: 'Shown as ALT-001, ALT-002, ALT-003' }
  ];

  // Section 2: Data Minimisation items
  const dataMinimisationItems = [
    'Bill payment type, amount, status, and date',
    'UPI payment regularity and balance pattern',
    'On-time ratio, late count, and bounce count'
  ];

  // Section 3: Consent & DPDP Act, 2023 items
  const dpdpItems = [
    'Explicit consent is taken before any data is used — see the Consent screen.',
    'Purpose is limited to loan assessment only.',
    'Consent can be withdrawn at any time — see Withdraw Consent on the Ingestion screen.',
    'This is a demo with fictional data. No real personal data is stored.'
  ];

  // Section 4: Fairness items
  const usedForScoring = [
    'On-time payment ratio',
    'Late payment count',
    'Bounce count',
    'Income regularity',
    'Balance pattern'
  ];

  const neverUsedForScoring = [
    'Gender',
    'Caste',
    'Religion',
    'Pincode alone',
    'Contacts',
    'Photos'
  ];

  // Section 5: Fairness Audit Checks
  const auditChecks = [
    'Protected attributes excluded from model inputs — PASS',
    'Tier is based only on payment behaviour features — PASS',
    'Medium Risk cases go to human review, not auto-reject — PASS',
    'Every decision shows simple reasons to the applicant — PASS'
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar: Back Button (single arrow icon only, no duplicate '<') & Demo Badge */}
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

      {/* Header Card */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13233A] tracking-tight">
          Privacy, Fairness &amp; Compliance
        </h2>
        <p className="text-sm text-[#667085] font-medium mt-1">
          How AltCredit protects data and avoids bias — demo only
        </p>
      </div>

      {/* Section 1 — PII Masking — What the model never sees */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            IDENTIFIER ANONYMISATION
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            PII Masking — What the model never sees
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E3DFD6] text-[#667085]">
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">Attribute</th>
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">System Handling</th>
                <th className="py-2.5 px-3 font-semibold text-[10px] uppercase tracking-wider">Sample Representation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3DFD6]">
              {piiRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F5F3EE]/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-[#13233A]">
                    {row.item}
                  </td>
                  <td className="py-2.5 px-3 text-[#667085]">
                    {row.status}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-[#13233A]">
                    {row.display}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#667085] mt-4 pt-3 border-t border-[#E3DFD6] leading-relaxed">
          Names on the lender screen are for identification only. The score uses masked IDs and payment behaviour, not personal identity.
        </p>
      </div>

      {/* Section 2 — Data Minimisation — Only this is extracted */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            EXTRACTION BOUNDARIES
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Data Minimisation — Only this is extracted
          </h3>
        </div>

        <ul className="divide-y divide-[#E3DFD6]/70 text-xs text-[#13233A]">
          {dataMinimisationItems.map((item, idx) => (
            <li key={idx} className="py-2.5 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A4B]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-[#667085] mt-4 pt-3 border-t border-[#E3DFD6] leading-relaxed">
          Full SMS text, contacts, photos, and location are never stored or used.
        </p>
      </div>

      {/* Section 3 — Consent & DPDP Act, 2023 — In this demo */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            STATUTORY COMPLIANCE &amp; CONSENT
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Consent &amp; DPDP Act, 2023 — In this demo
          </h3>
        </div>

        <ul className="divide-y divide-[#E3DFD6]/70 text-xs text-[#13233A]">
          {dpdpItems.map((item, idx) => (
            <li key={idx} className="py-2.5 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13233A] mt-1 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section 4 — Fairness — What is used, what is never used */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            BIAS MITIGATION MATRIX
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Fairness — What is used, what is never used
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
          {/* Column 1: Used for scoring */}
          <div className="bg-[#F5F3EE]/50 rounded-[10px] p-4 border border-[#E3DFD6]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E7A4B] block mb-2">
              USED FOR SCORING
            </span>
            <ul className="space-y-2 text-xs text-[#13233A]">
              {usedForScoring.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#0E7A4B] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Never used for scoring */}
          <div className="bg-[#F5F3EE]/50 rounded-[10px] p-4 border border-[#E3DFD6]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C0392B] block mb-2">
              NEVER USED FOR SCORING
            </span>
            <ul className="space-y-2 text-xs text-[#13233A]">
              {neverUsedForScoring.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#C0392B] font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 5 — Fairness Audit Checks — Demo */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            INTERNAL CONTROLS
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Fairness Audit Checks — Demo
          </h3>
        </div>

        <div className="divide-y divide-[#E3DFD6] text-xs">
          {auditChecks.map((check, idx) => {
            const [text, result] = check.split(' — ');
            return (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[#13233A] font-medium">
                  {text}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-[#0E7A4B] bg-[#F5F3EE] border border-[#E3DFD6]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {result}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 6 — Limitations — Honest note for presentation */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-2 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            GOVERNANCE NOTE
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Limitations — Honest note for presentation
          </h3>
        </div>

        <div className="bg-[#F5F3EE]/60 rounded-[10px] p-4 border border-[#E3DFD6] text-xs text-[#13233A] leading-relaxed">
          Demo limitation: This browser prototype uses fixed fictional scores for presentation.
          A real deployment would need Account Aggregator integration, a validated ML model,
          RBI digital lending compliance review, and a full fairness audit on real data.
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-4 sm:p-5 flex items-center justify-start">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 transition-colors"
        >
          Back to Applicants
        </button>
      </div>
    </div>
  );
}

