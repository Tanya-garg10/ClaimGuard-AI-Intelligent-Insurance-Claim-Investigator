import React from 'react';
import Markdown from 'react-markdown';
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert,
  Send,
  FileSearch,
  FileSpreadsheet
} from 'lucide-react';
import { ExplainableFinding } from '../types';

interface AnnotationFindingsProps {
  findings: ExplainableFinding[];
  onRequestEvidence?: (finding: ExplainableFinding) => void;
  onViewSourceDoc?: (docTitle: string) => void;
}

export const AnnotationFindings: React.FC<AnnotationFindingsProps> = ({
  findings,
  onRequestEvidence,
  onViewSourceDoc,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Investigative Findings &amp; Document Annotations</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3F1EB] text-slate-700 border border-[#E3E0D8]">
              {findings.length} Flagged Points
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pinpointed discrepancies and policy divergences traced across source filings.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {findings.map((finding, index) => {
          const isDateMismatch = finding.title.toLowerCase().includes('date');
          const isRoomCap = finding.title.toLowerCase().includes('room') || finding.title.toLowerCase().includes('cap');
          const isMissingReport = finding.title.toLowerCase().includes('missing') || finding.title.toLowerCase().includes('pathology');

          return (
            <div
              key={finding.id}
              className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper relative overflow-hidden space-y-4"
            >
              {/* Finding Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-[#EEF2FF] px-2 py-0.5 rounded-md border border-[#C7D2FE]">
                    Finding {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {finding.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F3F1EB] text-slate-600 border border-[#E3E0D8]">
                    {finding.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    finding.severity === 'critical'
                      ? 'bg-[#FFF1F2] border-[#FECDD3] text-rose-800'
                      : finding.severity === 'warning'
                      ? 'bg-[#FFFBEB] border-[#FCD34D] text-amber-800'
                      : 'bg-[#F0FDF4] border-[#BBF7D0] text-emerald-800'
                  }`}>
                    {finding.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Bespoke Visual Connector for Date Mismatch & Value Discrepancies */}
              {isDateMismatch ? (
                <div className="bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl p-3.5 space-y-2">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">
                    Document Chronology Comparison
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    
                    {/* Document A */}
                    <div className="w-full sm:w-1/2 bg-white border border-[#E2E0D8] rounded-lg p-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>Medical Discharge Summary</span>
                        <span className="text-emerald-700 font-bold">Dr. Vivek Mehra</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-slate-900 flex items-center justify-between">
                        <span>12 AUG 2026</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Operative Record</span>
                      </div>
                    </div>

                    {/* Thin Connector Line with Icon */}
                    <div className="flex sm:flex-col items-center justify-center shrink-0 px-2 text-rose-600">
                      <div className="hidden sm:block h-3 w-px bg-rose-300" />
                      <div className="w-7 h-7 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xs font-mono font-bold">
                        ≠
                      </div>
                      <div className="hidden sm:block h-3 w-px bg-rose-300" />
                      <span className="sm:hidden text-xs font-mono text-rose-600 mx-2">CONTRADICTS</span>
                    </div>

                    {/* Document B */}
                    <div className="w-full sm:w-1/2 bg-white border border-rose-300 rounded-lg p-2.5 shadow-2xs bg-rose-50/20">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>Hospital Itemized Tax Invoice</span>
                        <span className="text-rose-700 font-bold">Apollo Patient Billing</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-rose-700 flex items-center justify-between">
                        <span>14 AUG 2026</span>
                        <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">Discrepancy</span>
                      </div>
                    </div>

                  </div>
                </div>
              ) : isRoomCap ? (
                <div className="bg-[#FAF9F5] border border-[#E8E5DC] rounded-xl p-3.5 space-y-2">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">
                    Policy Cap vs Billed Tariff Comparison
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    
                    <div className="w-full sm:w-1/2 bg-white border border-[#E2E0D8] rounded-lg p-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>Policy Schedule (Clause 4.3)</span>
                        <span className="text-indigo-700 font-bold">Daily Ceiling</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-slate-900 flex items-center justify-between">
                        <span>₹8,000 / day</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">Authorized Cap</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center justify-center shrink-0 px-2 text-amber-600">
                      <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-mono font-bold">
                        &gt;
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2 bg-white border border-amber-300 rounded-lg p-2.5 shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                        <span>Hospital Bill Line 3</span>
                        <span className="text-amber-800 font-bold">Deluxe Room</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-amber-800 flex items-center justify-between">
                        <span>₹14,000 / day</span>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">Excess ₹12,000</span>
                      </div>
                    </div>

                  </div>
                </div>
              ) : null}

              {/* What Happened & Supporting Excerpts */}
              <div className="text-xs text-slate-700 leading-relaxed [&_strong]:font-bold [&_strong]:text-slate-900">
                <span className="font-semibold text-slate-900">What Happened: </span>
                <span className="inline">
                  <Markdown components={{ p: ({ children }) => <span className="inline">{children}</span> }}>
                    {finding.whatHappened}
                  </Markdown>
                </span>
              </div>

              {/* Why It Matters */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 text-xs [&_strong]:font-bold [&_strong]:text-slate-900">
                <p className="font-semibold text-slate-900 font-mono text-[11px] uppercase tracking-wider text-slate-600 mb-0.5">
                  Why It Matters:
                </p>
                <div className="text-slate-600 leading-relaxed">
                  <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>
                    {finding.whyItMatters}
                  </Markdown>
                </div>
              </div>

              {/* Supporting Excerpts Pills */}
              {finding.supportingEvidence.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px] uppercase">Citations:</span>
                  {finding.supportingEvidence.map((ev, i) => (
                    <button
                      key={i}
                      onClick={() => onViewSourceDoc && onViewSourceDoc(ev.documentTitle)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#DCD9D0] text-slate-700 hover:bg-[#F3F1EB] transition-colors shadow-2xs font-mono text-[10px]"
                    >
                      <FileSearch className="w-3 h-3 text-indigo-600" />
                      <span className="font-bold">{ev.documentTitle}</span>
                      <span className="text-slate-400">({ev.reference})</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Action Bar */}
              <div className="pt-3 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 [&_strong]:font-bold [&_strong]:text-slate-900">
                  <span className="shrink-0">Recommendation:</span>
                  <div className="text-slate-800 font-semibold inline">
                    <Markdown components={{ p: ({ children }) => <span className="inline">{children}</span> }}>
                      {finding.whatShouldHappenNext}
                    </Markdown>
                  </div>
                </div>

                {onRequestEvidence && (
                  <button
                    onClick={() => onRequestEvidence(finding)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-paper group"
                  >
                    <span>REQUEST EVIDENCE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
