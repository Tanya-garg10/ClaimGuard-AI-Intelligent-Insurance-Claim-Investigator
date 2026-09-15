import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  DollarSign, 
  User, 
  Stethoscope, 
  FileText,
  Check
} from 'lucide-react';
import { VerificationItem } from '../types';

interface VerificationMatrixProps {
  verifications: VerificationItem[];
  onToggleVerified?: (verificationId: string) => void;
}

export const VerificationMatrix: React.FC<VerificationMatrixProps> = ({
  verifications,
  onToggleVerified,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categoryIcons = {
    dates: <Calendar className="w-4 h-4 text-cyan-400" />,
    amounts: <DollarSign className="w-4 h-4 text-emerald-400" />,
    identities: <User className="w-4 h-4 text-blue-400" />,
    treatments: <Stethoscope className="w-4 h-4 text-purple-400" />,
    policy_conditions: <FileText className="w-4 h-4 text-amber-400" />,
  };

  const filtered = verifications.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchCat && matchStatus;
  });

  const getStatusDisplay = (status: VerificationItem['status']) => {
    switch (status) {
      case 'matched':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Matched
          </span>
        );
      case 'mismatch':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/80 px-2 py-0.5 rounded-full">
            <AlertOctagon className="w-3 h-3 text-rose-400" /> Discrepancy
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> Flagged
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
            <HelpCircle className="w-3 h-3 text-slate-400" /> Unverified
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      
      {/* Matrix Controls Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-850">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-slate-100">Cross-Document Verification Matrix</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {verifications.length} verified fields
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automated entity comparison across dates, amounts, claimant identities, treatments, and policy terms.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex">
            {['all', 'dates', 'amounts', 'identities', 'treatments', 'policy_conditions'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded-md font-medium capitalize transition-colors text-[11px] ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="mismatch">Discrepancies Only</option>
            <option value="matched">Matched Only</option>
            <option value="flagged">Flagged Only</option>
          </select>
        </div>
      </div>

      {/* Verification Rows Table */}
      <div className="divide-y divide-slate-800 overflow-x-auto">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-4 transition-colors hover:bg-slate-850/50 ${
                item.status === 'mismatch' ? 'bg-rose-950/10' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {categoryIcons[item.category] || <FileText className="w-4 h-4 text-slate-400" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-[10px] uppercase font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                        {item.category.replace('_', ' ')}
                      </span>
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusDisplay(item.status)}
                  {onToggleVerified && (
                    <button
                      onClick={() => onToggleVerified(item.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1 transition-colors ${
                        item.investigatorChecked
                          ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Mark verified by human investigator"
                    >
                      <Check className="w-3 h-3" />
                      <span>{item.investigatorChecked ? 'Verified by Auditor' : 'Verify'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Cross-Document Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-3 text-xs">
                
                {/* Expected / Baseline */}
                <div className="md:col-span-4 bg-slate-850 p-2.5 rounded-lg border border-slate-800">
                  <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                    Expected / Policy Baseline:
                  </p>
                  <p className="text-slate-200 font-mono text-[11px]">{item.expectedValue}</p>
                </div>

                {/* Actual Document Extractions */}
                <div className="md:col-span-8 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5">
                  <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
                    Extracted Values from Documents:
                  </p>
                  <div className="space-y-1">
                    {item.actualValues.map((val, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-2 text-[11px]">
                        <span className="text-slate-400 font-medium shrink-0">
                          &bull; {val.documentTitle}:
                        </span>
                        <span className="text-slate-200 font-mono text-right truncate">
                          {val.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Investigator Explanation Note */}
              <div className="mt-2 text-[11px] text-slate-400 pl-2 border-l-2 border-slate-700 flex items-start gap-1 [&_strong]:text-amber-200 [&_strong]:font-bold">
                <span className="font-semibold text-slate-300 shrink-0">Auditor Reasoning: </span>
                <div>
                  <Markdown>{item.explanation}</Markdown>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
