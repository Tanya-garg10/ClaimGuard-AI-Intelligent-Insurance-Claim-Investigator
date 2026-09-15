import React from 'react';
import { 
  UserCheck, 
  Send, 
  AlertTriangle, 
  FileDown, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Clock
} from 'lucide-react';
import { MissingEvidenceItem, ClaimCase } from '../types';

interface HumanInTheLoopActionBarProps {
  claimCase: ClaimCase;
  onRequestEvidence: (item: MissingEvidenceItem) => void;
  onDecision: (action: 'APPROVE' | 'DENY' | 'ESCALATE_SIU' | 'CONTINUE_REVIEW') => void;
  onExportReport: () => void;
}

export const HumanInTheLoopActionBar: React.FC<HumanInTheLoopActionBarProps> = ({
  claimCase,
  onRequestEvidence,
  onDecision,
  onExportReport,
}) => {
  const { missingEvidence, recommendedAction } = claimCase.report;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm space-y-4 p-5">
      
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>Human-in-the-Loop Decision Workspace</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                Final Authority: Human Claims Examiner
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ClaimGuard provides explainable reasoning; the investigator retains final adjudication authority.
            </p>
          </div>
        </div>

        <button
          onClick={onExportReport}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <FileDown className="w-3.5 h-3.5 text-blue-400" />
          <span>Export Audit Dossier</span>
        </button>
      </div>

      {/* Missing Evidence & RFI Section */}
      {missingEvidence.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Missing Evidence Items &amp; Evidence Requests:</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {missingEvidence.length} items required to complete verification
            </span>
          </div>

          <div className="space-y-2">
            {missingEvidence.map((item) => (
              <div
                key={item.id}
                className="bg-slate-850 p-3 rounded-lg border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{item.title}</span>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono ${
                        item.importance === 'critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {item.importance}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Target: {item.targetParty}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">{item.reason}</p>
                </div>

                <button
                  onClick={() => onRequestEvidence(item)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Generate Formal RFI Notice</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Decision Action Desk */}
      <div className="pt-3 border-t border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-200 block">
              Adjudication Determination Desk:
            </span>
            <span className="text-[11px] text-slate-400">
              AI Recommendation: <strong className="text-amber-400">{recommendedAction.replace('_', ' ')}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Escalate to SIU */}
            <button
              onClick={() => onDecision('ESCALATE_SIU')}
              className="px-3 py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Escalate to SIU Fraud Unit</span>
            </button>

            {/* Deny Claim */}
            <button
              onClick={() => onDecision('DENY')}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Deny Claim (Exclusion)</span>
            </button>

            {/* Continue Review */}
            <button
              onClick={() => onDecision('CONTINUE_REVIEW')}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Continue Review</span>
            </button>

            {/* Approve with Adjustments */}
            <button
              onClick={() => onDecision('APPROVE')}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Approve Allowed Settlement (${claimCase.report.coverage.allowedAmount.toLocaleString()})</span>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};
