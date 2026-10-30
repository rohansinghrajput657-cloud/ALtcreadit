import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ModelExplainabilityScreen({ onBack }) {
  // 1. Flow as text steps
  const workflowSteps = [
    'Consent',
    'Data Ingestion',
    'Feature Extraction',
    'Regression Score (300-900)',
    'Tier (Low / Medium / High)',
    'Simple Reasons',
    'Decision + Human Review where needed'
  ];

  // 2. Model explanation points
  const modelPoints = [
    'Output is a continuous score from 300 to 900, then grouped into tiers. Higher score means lower risk.',
    'Baseline model for comparison: Logistic Regression, easy to explain.',
    'Main model for tabular payment data: XGBoost / LightGBM Regressor.',
    'Evaluation metrics used in a real deployment: AUC-ROC, KS / Gini, Precision-Recall. No metric values are claimed here, because this demo uses fixed fictional scores.'
  ];

  // 3. Features used list
  const featuresList = [
    'On-time payment ratio',
    'Late payment count',
    'Bounce count',
    'Income regularity',
    'Balance pattern',
    'Expense ratio and disposable income where available (ALT-004 only)'
  ];

  // 4. Explainability example for Sneha
  const snehaReasons = [
    'Regular UPI income raised the score.',
    '2 late bills lowered the score.',
    'Irregular income lowered the score.'
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar: Back Button (single arrow only) & Demo Badge */}
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
          How the Model Works
        </h2>
        <p className="text-sm text-[#667085] font-medium mt-1">
          Regression score, explained in simple language — demo only
        </p>
      </div>

      {/* 1. End-to-End Pipeline Flow */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            END-TO-END PIPELINE
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Architecture Flow
          </h3>
        </div>

        {/* Text steps, not a fake chart */}
        <div className="p-4 bg-[#F5F3EE]/60 rounded-[10px] border border-[#E3DFD6]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#13233A]">
            {workflowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-white px-2.5 py-1 rounded-[6px] border border-[#E3DFD6] font-semibold text-[#13233A]">
                  {step}
                </span>
                {idx < workflowSteps.length - 1 && (
                  <span className="text-[#667085] font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Model Architecture & Evaluation */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            MODEL ARCHITECTURE &amp; EVALUATION
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Model Explanation
          </h3>
        </div>

        <ul className="divide-y divide-[#E3DFD6]/70 text-xs text-[#13233A]">
          {modelPoints.map((point, idx) => (
            <li key={idx} className="py-2.5 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#13233A] mt-1.5 shrink-0" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Features Used in Scoring */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            FEATURE ENGINEERING
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Features Used
          </h3>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#13233A]">
          {featuresList.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 p-2.5 bg-[#F5F3EE]/50 rounded-[8px] border border-[#E3DFD6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E7A4B] shrink-0" />
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Explainability Example (Sneha) */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-3 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            SAMPLE LOCAL EXPLANATION (NO SHAP DECIMALS)
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Explainability Example — Sneha Verma (ALT-002, Score 621)
          </h3>
        </div>

        <div className="p-4 bg-[#F5F3EE]/50 rounded-[10px] border border-[#E3DFD6] space-y-2 text-xs">
          {snehaReasons.map((reason, idx) => {
            const isPositive = reason.includes('raised');
            return (
              <div key={idx} className="flex items-start gap-2.5">
                <span className={`font-mono font-bold text-sm leading-none shrink-0 mt-0.5 ${isPositive ? 'text-[#0E7A4B]' : 'text-[#C0392B]'}`}>
                  {isPositive ? '+' : '−'}
                </span>
                <span className="text-[#13233A] font-medium leading-relaxed">
                  {reason}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Prototype Limitations */}
      <div className="bg-white rounded-[14px] border border-[#E3DFD6] p-5 sm:p-6">
        <div className="mb-2 pb-2 border-b border-[#E3DFD6]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
            GOVERNANCE DISCLAIMER
          </span>
          <h3 className="text-base font-bold text-[#13233A] mt-0.5">
            Limitations
          </h3>
        </div>

        <div className="bg-[#F5F3EE]/60 rounded-[10px] p-4 border border-[#E3DFD6] text-xs text-[#13233A] leading-relaxed">
          Prototype limitation: Scores in this demo are fixed for presentation. Full model training, validation, and calibration on real consented data are required before real lending use.
        </div>
      </div>

      {/* Bottom Action Button */}
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

