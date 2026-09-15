import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Plus, 
  ChevronDown,
  User
} from 'lucide-react';
import { ClaimCase } from '../types';

export type NavSection = 'overview' | 'claims' | 'investigations' | 'evidence' | 'reports';

interface HeaderProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  cases: ClaimCase[];
  activeCase: ClaimCase;
  onSelectCase: (claim: ClaimCase) => void;
  onNewClaim: () => void;
  isAnalyzing: boolean;
  onRunAnalysis: () => void;
  onOpenCopilot: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  cases,
  activeCase,
  onSelectCase,
  onNewClaim,
  isAnalyzing,
  onRunAnalysis,
  onOpenCopilot,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFA]/90 backdrop-blur-md border-b border-[#ECEAE4] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Identity: Custom Shield + Evidence Node Mark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2.5 text-left group"
            >
              {/* Custom SVG mark: Shield + Evidence Node */}
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs group-hover:bg-slate-800 transition-colors relative">
                <svg
                  className="w-4 h-4 text-slate-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  {/* Central evidence node & connecting link */}
                  <circle cx="12" cy="11" r="2" fill="#818CF8" stroke="#818CF8" />
                  <line x1="12" y1="8" x2="12" y2="10" stroke="#818CF8" />
                </svg>
                {/* Tiny pinging evidence node */}
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white" />
              </div>

              <div>
                <span className="font-bold text-base tracking-tight text-slate-900">
                  ClaimGuard
                </span>
                <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200/60 ml-1.5 font-semibold">
                  AI
                </span>
              </div>
            </button>

            {/* Navigation links as requested */}
            <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
              {(
                [
                  { id: 'overview', label: 'Overview' },
                  { id: 'claims', label: 'Claims' },
                  { id: 'investigations', label: 'Investigations' },
                  { id: 'evidence', label: 'Evidence' },
                  { id: 'reports', label: 'Reports' },
                ] as const
              ).map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-[#F3F1EB] text-slate-900 font-bold border border-[#E3E0D8]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-[#FAF9F5]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Case Selector Pill */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                id="case-select-dropdown"
                value={activeCase.id}
                onChange={(e) => {
                  const selected = cases.find((c) => c.id === e.target.value);
                  if (selected) onSelectCase(selected);
                }}
                className="appearance-none bg-white border border-[#E2E0D8] text-slate-800 text-xs font-mono font-medium rounded-xl pl-3 pr-8 py-1.5 shadow-2xs focus:ring-1 focus:ring-indigo-500 cursor-pointer hover:border-slate-400 transition-colors max-w-[210px] sm:max-w-[280px] truncate"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.claimNumber} &bull; {c.claimantName} ({c.displayAmount || `$${c.claimedAmount.toLocaleString()}`})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* AI Assistant Copilot Trigger */}
            <button
              onClick={onOpenCopilot}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2E0D8] text-slate-700 hover:bg-[#FAF9F5] text-xs font-semibold transition-all shadow-2xs"
              title="Open Gemini AI Investigation Copilot"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Copilot</span>
            </button>

            {/* Run Analysis Button */}
            <button
              id="btn-run-investigation"
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-paper transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-300" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              )}
              <span className="hidden lg:inline">
                {isAnalyzing ? 'Analyzing...' : 'Re-verify Claim'}
              </span>
            </button>

            {/* New Claim Button */}
            <button
              id="btn-new-claim"
              onClick={onNewClaim}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#F3F1EB] hover:bg-[#EBE8E0] text-slate-700 border border-[#E3E0D8] text-xs font-semibold flex items-center gap-1 transition-colors"
              title="File New Insurance Claim"
            >
              <Plus className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">New Claim</span>
            </button>

            {/* Investigator Badge & Profile Trigger */}
            <button
              id="indicator-siu-investigator"
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#ECEAE4] py-1 px-2 text-left rounded-xl hover:bg-[#F3F1EB] transition-all cursor-pointer group"
              title="Click to view SIU Examiner Profile & Credentials"
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shadow-xs group-hover:ring-2 group-hover:ring-indigo-500/30 transition-all">
                  <User className="w-3.5 h-3.5 text-slate-200" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              </div>
              <div className="leading-none hidden md:block">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-900 transition-colors">SIU Examiner</p>
                  <span className="text-[8px] bg-indigo-50 text-indigo-700 font-mono px-1 py-0.2 rounded border border-indigo-100 font-semibold">ID</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono mt-0.5">Claims Adjudication</p>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
