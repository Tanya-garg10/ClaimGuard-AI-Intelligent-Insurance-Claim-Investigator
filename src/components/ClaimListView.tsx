import React, { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  Search, 
  ArrowRight, 
  Layers, 
  List, 
  Grid, 
  FileCheck2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { ClaimCase } from '../types';

interface ClaimListViewProps {
  cases: ClaimCase[];
  activeCaseId: string;
  onSelectCase: (claim: ClaimCase) => void;
  onOpenInvestigation: (claim: ClaimCase) => void;
}

export const ClaimListView: React.FC<ClaimListViewProps> = ({
  cases,
  activeCaseId,
  onSelectCase,
  onOpenInvestigation,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'compact' | 'evidence'>('cards');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = cases.filter((c) =>
    c.claimantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEvidenceTrail = (claim: ClaimCase) => {
    // Generate evidence trail badges based on documents & findings
    const hasReportWarning = claim.report.findings.some(f => f.category.includes('Chronology') || f.title.toLowerCase().includes('date'));
    const hasBillConflict = claim.report.findings.some(f => f.category.includes('Billing') || f.title.toLowerCase().includes('bill'));

    return (
      <div className="flex items-center gap-1.5 text-[11px] font-mono">
        {/* Policy */}
        <span className="inline-flex items-center gap-0.5 text-emerald-800 bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
          Policy <Check className="w-3 h-3 text-emerald-600" />
        </span>
        <span className="text-slate-300">—</span>

        {/* Bill */}
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded border ${
          hasBillConflict
            ? 'text-rose-800 bg-[#FFF1F2] border-[#FECDD3]'
            : 'text-emerald-800 bg-[#F0FDF4] border-[#BBF7D0]'
        }`}>
          Bill {hasBillConflict ? <AlertTriangle className="w-3 h-3 text-rose-600" /> : <Check className="w-3 h-3 text-emerald-600" />}
        </span>
        <span className="text-slate-300">—</span>

        {/* Report */}
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded border ${
          hasReportWarning
            ? 'text-amber-800 bg-[#FFFBEB] border-[#FCD34D]'
            : 'text-emerald-800 bg-[#F0FDF4] border-[#BBF7D0]'
        }`}>
          Report {hasReportWarning ? <AlertTriangle className="w-3 h-3 text-amber-600" /> : <Check className="w-3 h-3 text-emerald-600" />}
        </span>
        <span className="text-slate-300">—</span>

        {/* Prescription */}
        <span className="inline-flex items-center gap-0.5 text-emerald-800 bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
          Prescription <Check className="w-3 h-3 text-emerald-600" />
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      
      {/* List Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Active Claim Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-document forensic index across all ongoing claims.
          </p>
        </div>

        {/* View Mode Switcher & Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search claims or claimant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-[#E2E0D8] text-slate-800 text-xs rounded-xl px-3 py-1.5 pl-8 focus:ring-1 focus:ring-indigo-500 w-48 sm:w-60 shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>

          <div className="bg-[#F3F1EB] p-1 rounded-xl border border-[#E3E0D8] flex items-center text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'compact'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Compact</span>
            </button>
            <button
              onClick={() => setViewMode('evidence')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'evidence'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Evidence View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Large Horizontal Claim Cards */}
      {viewMode === 'cards' && (
        <div className="space-y-3.5">
          {filteredCases.map((claim) => {
            const isSelected = claim.id === activeCaseId;
            const isHighRisk = claim.report.riskLevel === 'HIGH' || claim.report.riskLevel === 'CRITICAL';

            return (
              <div
                key={claim.id}
                onClick={() => onSelectCase(claim)}
                className={`bg-[#FDFCFA] border rounded-2xl p-5 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover relative overflow-hidden ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                    : 'border-[#ECEAE4]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Metadata & Claimant */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-[#E2E0D8] px-2 py-0.5 rounded-md shadow-2xs">
                        {claim.claimNumber}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Policy: {claim.policyNumber}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-[#F3F1EB] text-slate-600 border border-[#E3E0D8]">
                        {claim.claimType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900">
                        {claim.claimantName}
                      </h3>
                      <span className="text-xs font-mono font-bold text-indigo-700 bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded-full">
                        {claim.displayAmount || `$${claim.claimedAmount.toLocaleString()}`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {claim.title}
                    </p>
                  </div>

                  {/* Middle: Evidence Trail */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      Visual Evidence Trail
                    </span>
                    {renderEvidenceTrail(claim)}
                  </div>

                  {/* Right: Risk & Action */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#F2EFE9] shrink-0">
                    <div className="text-right">
                      <span className={`inline-block text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                        isHighRisk
                          ? 'bg-[#FFF1F2] border-[#FECDD3] text-rose-800'
                          : 'bg-[#FFF7ED] border-[#FED7AA] text-amber-800'
                      }`}>
                        {claim.report.riskScore}/100 Risk &bull; {claim.report.riskLevel}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Status: {claim.report.recommendedAction.replace('_', ' ')}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(claim);
                        onOpenInvestigation(claim);
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Investigate</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Compact List View */}
      {viewMode === 'compact' && (
        <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl overflow-hidden shadow-paper divide-y divide-[#F2EFE9]">
          {filteredCases.map((claim) => (
            <div
              key={claim.id}
              onClick={() => onSelectCase(claim)}
              className="p-3.5 hover:bg-white flex items-center justify-between gap-4 cursor-pointer transition-colors text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono font-bold text-slate-800 shrink-0">
                  {claim.claimNumber}
                </span>
                <span className="font-semibold text-slate-900 truncate">
                  {claim.claimantName}
                </span>
                <span className="text-slate-500 font-mono shrink-0">
                  {claim.displayAmount || `$${claim.claimedAmount.toLocaleString()}`}
                </span>
              </div>

              <div className="hidden md:block">
                {renderEvidenceTrail(claim)}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono font-semibold text-[11px] text-slate-700">
                  {claim.report.riskLevel} ({claim.report.riskScore})
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCase(claim);
                    onOpenInvestigation(claim);
                  }}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Inspect &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 3: Evidence View (Matrix of files & issues) */}
      {viewMode === 'evidence' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCases.map((claim) => (
            <div
              key={claim.id}
              onClick={() => onSelectCase(claim)}
              className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-4 shadow-paper hover:shadow-paper-hover cursor-pointer transition-all space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2EFE9]">
                <div>
                  <span className="font-mono font-bold text-xs text-slate-800">{claim.claimNumber}</span>
                  <h4 className="font-bold text-sm text-slate-900">{claim.claimantName}</h4>
                </div>
                <span className="font-mono text-xs font-bold text-indigo-700">
                  {claim.displayAmount || `$${claim.claimedAmount.toLocaleString()}`}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <p className="font-semibold text-slate-600 font-mono text-[10px] uppercase">
                  Evidence Files ({claim.documents.length}):
                </p>
                {claim.documents.slice(0, 4).map((d) => (
                  <div key={d.id} className="flex items-center justify-between text-slate-700">
                    <span className="truncate">&bull; {d.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{d.date}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F2EFE9]">
                {renderEvidenceTrail(claim)}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
