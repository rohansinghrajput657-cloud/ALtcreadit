import React, { useState } from 'react';
import { APPLICANTS } from './data/applicants';
import ApplicantCard from './components/ApplicantCard';
import ApplicantDetail from './components/ApplicantDetail';
import ConsentScreen from './components/ConsentScreen';
import IngestionScreen from './components/IngestionScreen';
import PrivacyFairnessScreen from './components/PrivacyFairnessScreen';
import ModelExplainabilityScreen from './components/ModelExplainabilityScreen';
import CursorGlow from './components/CursorGlow';
import Logo from './components/Logo';
import TierDonutChart from './components/TierDonutChart';
import OnTimeRatioBarChart from './components/OnTimeRatioBarChart';
import { useCountUp } from './utils/useCountUp';

export default function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'detail' | 'consent' | 'ingestion' | 'privacy' | 'model'
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [withdrawalNotice, setWithdrawalNotice] = useState('');
  
  // Replay animation trigger: increments to re-run all count-ups & entrances from 0
  const [animTrigger, setAnimTrigger] = useState(0);

  const selectedApplicant = APPLICANTS.find((a) => a.id === selectedApplicantId);

  // Exact 4 applicants in fixed order: Ramesh, Sneha, Vikram, Amit
  const filteredApplicants =
    selectedFilter === 'All'
      ? APPLICANTS
      : APPLICANTS.filter((applicant) => applicant.tier === selectedFilter);

  // Summary counts
  const totalCount = APPLICANTS.length;
  const lowRiskCount = APPLICANTS.filter((a) => a.tier === 'Low Risk').length;
  const mediumRiskCount = APPLICANTS.filter((a) => a.tier === 'Medium Risk').length;
  const highRiskCount = APPLICANTS.filter((a) => a.tier === 'High Risk').length;

  // Count-up numbers in order: Total (4) -> Low (1) -> Medium (1) -> High (2)
  const displayTotal = useCountUp(totalCount, 800, 50, animTrigger, 0);
  const displayLow = useCountUp(lowRiskCount, 700, 150, animTrigger, 0);
  const displayMedium = useCountUp(mediumRiskCount, 700, 250, animTrigger, 0);
  const displayHigh = useCountUp(highRiskCount, 700, 350, animTrigger, 0);

  const filterButtons = [
    { label: 'All', count: totalCount },
    { label: 'Low Risk', count: lowRiskCount },
    { label: 'Medium Risk', count: mediumRiskCount },
    { label: 'High Risk', count: highRiskCount }
  ];

  const handleCardClick = (applicantId) => {
    setSelectedApplicantId(applicantId);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedApplicantId(null);
    setCurrentView('list');
  };

  const handleStartNewAssessment = () => {
    setWithdrawalNotice('');
    setCurrentView('consent');
  };

  const handleOpenPrivacy = () => {
    setWithdrawalNotice('');
    setCurrentView('privacy');
  };

  const handleOpenModel = () => {
    setWithdrawalNotice('');
    setCurrentView('model');
  };

  const handleWithdrawConsent = () => {
    setCurrentView('list');
    setWithdrawalNotice('Consent withdrawn. No demo data was stored.');
  };

  const handleViewRameshScore = () => {
    setSelectedApplicantId('ALT-001');
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen bg-transparent text-[#13233A] pb-16 font-sans relative overflow-x-hidden">
      {/* Subtle Desktop Mouse Glow */}
      <CursorGlow />

      {/* Top Header / Lender Workspace Bar with White to Warm-Paper Light Gradient */}
      <header className="anim-fade-down bg-gradient-to-b from-white to-[#F5F3EE] border-b border-[#E3DFD6] sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Logo: Deep navy shield with white outline and gold check next to serif wordmark */}
            <Logo onClick={handleBackToList} />

            {/* Header Right: Badge & Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-medium bg-white text-[#667085] border border-[#E3DFD6] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F]" />
                Demo Data — Fictional Applicants Only
              </span>

              {currentView === 'list' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleOpenModel}
                    className="btn-interactive px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 shadow-sm"
                  >
                    Model &amp; Explainability
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenPrivacy}
                    className="btn-interactive px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#13233A] bg-white border border-[#E3DFD6] hover:border-[#13233A]/40 shadow-sm"
                  >
                    Privacy &amp; Fairness
                  </button>

                  <button
                    type="button"
                    onClick={handleStartNewAssessment}
                    className="btn-interactive btn-primary-gradient px-3.5 py-1.5 rounded-[8px] text-xs font-semibold shadow-md"
                  >
                    Start New Assessment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        {/* Model & Explainability Screen (Phase 7) */}
        {currentView === 'model' && (
          <div className="view-enter-slide">
            <ModelExplainabilityScreen onBack={handleBackToList} />
          </div>
        )}

        {/* Privacy & Fairness Screen (Phase 5) */}
        {currentView === 'privacy' && (
          <div className="view-enter-slide">
            <PrivacyFairnessScreen onBack={handleBackToList} />
          </div>
        )}

        {/* Consent Screen (Phase 3) */}
        {currentView === 'consent' && (
          <div className="view-enter-slide">
            <ConsentScreen
              onBack={handleBackToList}
              onDecline={handleBackToList}
              onConsentGiven={() => setCurrentView('ingestion')}
            />
          </div>
        )}

        {/* Ingestion Demo Screen (Phase 3) */}
        {currentView === 'ingestion' && (
          <div className="view-enter-slide">
            <IngestionScreen
              onBackToConsent={() => setCurrentView('consent')}
              onWithdrawConsent={handleWithdrawConsent}
              onViewRameshScore={handleViewRameshScore}
              onBackToApplicants={handleBackToList}
            />
          </div>
        )}

        {/* Applicant Detail Screen (Phase 2, 4, 6) */}
        {currentView === 'detail' && selectedApplicant && (
          <ApplicantDetail
            applicant={selectedApplicant}
            onBack={handleBackToList}
          />
        )}

        {/* Applicants List Screen (Phase 1 & Redesigned Approved Look) */}
        {currentView === 'list' && (
          <>
            {/* Withdrawal notice if consent was withdrawn */}
            {withdrawalNotice && (
              <div className="mb-5 p-3.5 bg-white rounded-[12px] border border-[#E3DFD6] flex items-center justify-between text-xs text-[#13233A] anim-fade-down shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B7791F]" />
                  <span className="font-semibold">{withdrawalNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setWithdrawalNotice('')}
                  className="text-[#667085] hover:text-[#13233A] text-xs font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* List Page Hero Section */}
            <section className="card-top-accent bg-white rounded-[18px] border border-[#E3DFD6] p-6 sm:p-8 mb-6 shadow-sm anim-fade-up">
              <div className="max-w-3xl">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0E7A4B] block mb-1">
                  FINANCIAL INCLUSION INTELLIGENCE
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#13233A] tracking-tight leading-tight">
                  Credit score without CIBIL, <br className="hidden sm:inline" />
                  <span className="text-gradient-navy-emerald">based on payment behaviour.</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#667085] mt-2 leading-relaxed">
                  Alternative behavioral underwriting benchmarked from UPI regularity, utility bill clearance, and cash flow stability for unbanked and gig economy workers.
                </p>
              </div>

              {/* Rules & Scale micro-bar */}
              <div className="mt-5 pt-4 border-t border-[#E3DFD6] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#667085]">
                <span className="font-semibold text-[#13233A]">Rules &amp; Scale:</span>
                <span>Score range is 300 to 900 (higher score = lower risk).</span>
                <span className="hidden sm:inline text-[#CCC8BE]">•</span>
                <span>
                  <strong className="text-[#0E7A4B] font-semibold">700–900:</strong> Low Risk
                </span>
                <span className="hidden sm:inline text-[#CCC8BE]">•</span>
                <span>
                  <strong className="text-[#B7791F] font-semibold">550–699:</strong> Medium Risk
                </span>
                <span className="hidden sm:inline text-[#CCC8BE]">•</span>
                <span>
                  <strong className="text-[#C0392B] font-semibold">300–549:</strong> High Risk
                </span>
              </div>
            </section>

            {/* Summary Strip (Tiles count up in order, hover lifts & highlights) */}
            <section
              aria-label="Summary Statistics"
              className="card-top-accent bg-white rounded-[18px] border border-[#E3DFD6] p-5 sm:p-6 mb-6 anim-fade-up shadow-sm"
              style={{ animationDelay: '100ms' }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E3DFD6]">
                {/* Tile 1: Total */}
                <div className="px-4 pt-2 sm:pt-0 first:pl-0 rounded-[10px] transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F3EE]/50">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                    TOTAL APPLICANTS
                  </span>
                  <p className="text-3xl font-extrabold font-serif text-[#13233A] tabular-nums mt-1">
                    {displayTotal}
                  </p>
                </div>

                {/* Tile 2: Low Risk */}
                <div className="px-4 pt-2 sm:pt-0 rounded-[10px] transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F3EE]/50">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                    LOW RISK (700+)
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0E7A4B]" />
                    <p className="text-3xl font-extrabold font-serif text-[#0E7A4B] tabular-nums">
                      {displayLow}
                    </p>
                  </div>
                </div>

                {/* Tile 3: Medium Risk */}
                <div className="px-4 pt-2 sm:pt-0 rounded-[10px] transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F3EE]/50">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                    MEDIUM RISK (550-699)
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B7791F]" />
                    <p className="text-3xl font-extrabold font-serif text-[#B7791F] tabular-nums">
                      {displayMedium}
                    </p>
                  </div>
                </div>

                {/* Tile 4: High Risk */}
                <div className="px-4 pt-2 sm:pt-0 last:pr-0 rounded-[10px] transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5F3EE]/50">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] block">
                    HIGH RISK (&lt;550)
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" />
                    <p className="text-3xl font-extrabold font-serif text-[#C0392B] tabular-nums">
                      {displayHigh}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Analytics Grid: Donut Chart + On-Time Ratio Bar Chart */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 anim-fade-up" style={{ animationDelay: '180ms' }}>
              {/* Donut Chart: 5 cols */}
              <div className="card-top-accent md:col-span-5 bg-white rounded-[18px] border border-[#E3DFD6] shadow-sm">
                <TierDonutChart animTrigger={animTrigger} />
              </div>

              {/* On-Time Ratio Bars: 7 cols */}
              <div className="card-top-accent md:col-span-7 bg-white rounded-[18px] border border-[#E3DFD6] shadow-sm">
                <OnTimeRatioBarChart animTrigger={animTrigger} />
              </div>
            </section>

            {/* Filter Row */}
            <section aria-label="Applicant Filters" className="mb-5 anim-fade-up" style={{ animationDelay: '220ms' }}>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] mr-1">
                  FILTER BY TIER:
                </span>
                {filterButtons.map((btn) => {
                  const isActive = selectedFilter === btn.label;
                  return (
                    <button
                      key={btn.label}
                      type="button"
                      onClick={() => setSelectedFilter(btn.label)}
                      className={`btn-interactive inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] text-xs font-semibold shadow-sm border ${
                        isActive
                          ? 'btn-primary-gradient active-filter-pulse'
                          : 'bg-white text-[#13233A] border-[#E3DFD6] hover:border-[#13233A]/40'
                      }`}
                    >
                      <span>{btn.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-mono tabular-nums ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#F5F3EE] text-[#667085]'
                        }`}
                      >
                        {btn.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Applicant Cards List (Staggered count-up & entrance) */}
            <section aria-label="Applicants List" className="space-y-4">
              {filteredApplicants.map((applicant, idx) => (
                <ApplicantCard
                  key={`${applicant.id}-${animTrigger}`}
                  applicant={applicant}
                  index={idx}
                  animTrigger={animTrigger}
                  onClick={() => handleCardClick(applicant.id)}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
