import React from 'react';
import { 
  ShieldAlert, 
  FileCheck2, 
  TrendingDown, 
  HelpCircle
} from 'lucide-react';
import { CoverageAssessment, RiskLevel } from '../types';

interface CoverageAssessmentCardProps {
  coverage: CoverageAssessment;
  riskScore: number;
  riskLevel: RiskLevel;
  recommendedAction: string;
}

export const CoverageAssessmentCard: React.FC<CoverageAssessmentCardProps> = ({
  coverage,
  riskScore,
  riskLevel,
  recommendedAction,
}) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-400 bg-rose-950/60 border-rose-800';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-950/60 border-yellow-800';
      default:
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
    }
  };

  const disallowedPercentage = Math.round((coverage.unauthorizedAmount / Math.max(1, coverage.claimedAmount)) * 100);
  const allowedPercentage = 100 - disallowedPercentage;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-850">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">Coverage & Financial Adjudication</h3>
            <p className="text-xs text-slate-400 font-mono">Policy: {coverage.policyNumber}</p>
          </div>
        </div>

        {/* Risk & Recommendation Badges */}
        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getRiskColor(riskLevel)}`}>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Risk Score: {riskScore}/100 &bull; {riskLevel}</span>
          </div>
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950/60 border border-blue-800 text-blue-300">
            Action: {recommendedAction.replace('_', ' ')}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        
        {/* Coverage Status Banner */}
        <div className="bg-slate-850 p-3 rounded-lg border border-slate-800 text-xs flex items-center justify-between gap-2">
          <div>
            <span className="text-slate-400 text-[11px] block uppercase font-mono">Status Assessment:</span>
            <span className="font-semibold text-slate-200 text-sm">{coverage.statusText}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            AI Adjudication
          </span>
        </div>

        {/* Financial Split Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-850/60 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase font-mono text-slate-400">Total Claimed</p>
            <p className="text-lg font-bold text-slate-100 mt-1 font-mono">
              ${coverage.claimedAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Submitted Bills</p>
          </div>

          <div className="bg-slate-850/60 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase font-mono text-emerald-400">Allowed Base</p>
            <p className="text-lg font-bold text-emerald-400 mt-1 font-mono">
              ${coverage.allowedAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Policy Authorized</p>
          </div>

          <div className="bg-slate-850/60 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase font-mono text-blue-400">Deductible Obligation</p>
            <p className="text-lg font-bold text-blue-400 mt-1 font-mono">
              ${coverage.deductible.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Patient Responsibility</p>
          </div>

          <div className="bg-slate-850/60 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase font-mono text-rose-400">Disallowed / Disputed</p>
            <p className="text-lg font-bold text-rose-400 mt-1 font-mono">
              ${coverage.unauthorizedAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-rose-400/80 mt-0.5">{disallowedPercentage}% of claim flagged</p>
          </div>
        </div>

        {/* Financial Visual Proportion Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 text-[11px]">Financial Exposure Ratio</span>
            <span className="text-slate-300 font-mono text-[11px]">
              ${coverage.allowedAmount.toLocaleString()} Authorized vs ${coverage.unauthorizedAmount.toLocaleString()} Disputed
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${Math.max(5, allowedPercentage)}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Authorized: $${coverage.allowedAmount}`}
            />
            <div
              style={{ width: `${Math.max(5, disallowedPercentage)}%` }}
              className="bg-rose-500 h-full transition-all duration-500"
              title={`Disputed/Disallowed: $${coverage.unauthorizedAmount}`}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Covered / Payable
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span> Disallowed / Exclusion
            </span>
          </div>
        </div>

        {/* Applied Policy Clauses Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
            Applied Policy Clauses & Contractual Caps:
          </p>

          <div className="space-y-1.5">
            {coverage.clausesApplied.map((clause, idx) => (
              <div
                key={idx}
                className="bg-slate-850 p-2.5 rounded-lg border border-slate-800 text-xs flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-blue-400 font-bold text-[11px] block">
                    {clause.clauseId}
                  </span>
                  <p className="text-slate-300 text-[11px] truncate">{clause.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      clause.impact === 'excluded'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : clause.impact === 'capped'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {clause.impact}
                  </span>
                  {clause.amountImpact !== undefined && (
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      ${clause.amountImpact.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {coverage.notes && (
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Auditor Notes: </span>
            {coverage.notes}
          </div>
        )}

      </div>

    </div>
  );
};
