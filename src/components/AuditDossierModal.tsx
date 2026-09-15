import React, { useRef } from 'react';
import Markdown from 'react-markdown';
import { 
  X, 
  Printer, 
  Download, 
  FileCheck2, 
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';
import { ClaimCase } from '../types';

interface AuditDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimCase: ClaimCase;
}

export const AuditDossierModal: React.FC<AuditDossierModalProps> = ({
  isOpen,
  onClose,
  claimCase,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const { report } = claimCase;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl w-full max-w-4xl shadow-paper-elevated overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Toolbar */}
        <div className="p-4 border-b border-[#ECEAE4] bg-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Official Claim Investigation Dossier &bull; SIU Audit Report
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Claim #{claimCase.claimNumber} &bull; Claimant: {claimCase.claimantName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-paper"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-300" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F3F1EB] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Formal Dossier Body */}
        <div ref={printRef} className="p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-900 text-xs font-sans">
          
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  ClaimGuard AI
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                  SIU FORENSIC MEMORANDUM
                </span>
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5 font-mono">
                Intelligent Insurance Claim Investigation &bull; Special Investigation Division
              </p>
            </div>

            <div className="text-right text-slate-500 font-mono text-[11px]">
              <p>Audit Ref: <strong>SIU-2026-AUDIT-{claimCase.claimNumber}</strong></p>
              <p>Certified On: {new Date().toLocaleDateString('en-GB')}</p>
              <p>Investigator: <strong>Senior SIU Examiner</strong></p>
            </div>
          </div>

          {/* Claim Dossier Overview Table */}
          <div className="bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-slate-500 font-mono text-[10px] uppercase">Claimant Name</span>
              <p className="font-bold text-slate-900 text-sm">{claimCase.claimantName}</p>
            </div>
            <div>
              <span className="text-slate-500 font-mono text-[10px] uppercase">Claim Amount</span>
              <p className="font-bold text-indigo-700 font-mono text-sm">
                {claimCase.displayAmount || `$${claimCase.claimedAmount.toLocaleString()}`}
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-mono text-[10px] uppercase">Policy Number</span>
              <p className="font-bold text-slate-900 text-sm font-mono">{claimCase.policyNumber}</p>
            </div>
            <div>
              <span className="text-slate-500 font-mono text-[10px] uppercase">Calculated Exposure</span>
              <p className="font-bold text-amber-700 text-sm font-mono">{report.riskScore}/100 ({report.riskLevel})</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs font-mono uppercase tracking-wider">
              1. Executive Investigative Summary
            </h4>
            <div className="text-slate-700 leading-relaxed bg-[#FAF9F5] p-3.5 rounded-xl border border-[#ECEAE4] [&_strong]:text-slate-900 [&_strong]:font-bold">
              <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>{report.summary}</Markdown>
            </div>
          </div>

          {/* Core Findings */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs font-mono uppercase tracking-wider">
              2. Flagged Inconsistencies &amp; Policy Divergence
            </h4>
            <div className="space-y-2.5">
              {report.findings.map((f, i) => (
                <div key={f.id} className="p-3 bg-white border border-[#E2E0D8] rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono">
                      #{i + 1} &bull; {f.title}
                    </span>
                    <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                      {f.severity}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[11px] leading-relaxed [&_strong]:text-slate-900 [&_strong]:font-bold">
                    <span className="font-bold text-slate-800">Evidence: </span>
                    <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>{f.whatHappened}</Markdown>
                  </div>
                  <div className="text-slate-600 text-[11px] leading-relaxed [&_strong]:text-slate-900 [&_strong]:font-bold">
                    <span className="font-bold text-slate-800">Justification: </span>
                    <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>{f.whyItMatters}</Markdown>
                  </div>
                  {f.whatShouldHappenNext && (
                    <div className="text-indigo-950 text-[11px] leading-relaxed [&_strong]:text-indigo-900 [&_strong]:font-bold">
                      <span className="font-bold text-slate-800">Action: </span>
                      <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>{f.whatShouldHappenNext}</Markdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Document Checks */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs font-mono uppercase tracking-wider">
              3. Cross-Document Corroboration Matrix
            </h4>
            <div className="border border-[#ECEAE4] rounded-xl overflow-hidden">
              <table className="w-full text-left font-mono text-[10px]">
                <thead className="bg-[#FAF9F5] border-b border-[#ECEAE4] text-slate-600">
                  <tr>
                    <th className="p-2.5">Check Category</th>
                    <th className="p-2.5">Verification Point</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Investigator Sign-off</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECEAE4]">
                  {report.verifications.map((v) => (
                    <tr key={v.id}>
                      <td className="p-2.5 uppercase font-semibold text-slate-500">{v.category}</td>
                      <td className="p-2.5 text-slate-900 font-bold">{v.title}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded ${
                          v.status === 'matched'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}>
                          {v.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600">
                        {v.investigatorChecked ? '✓ SIU Verified' : 'Pending Verification'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Adjudication Determination */}
          <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">
                SIU Recommendation
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {report.recommendedAction.replace('_', ' ')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400">Authorized Settlement:</span>
              <p className="text-base font-bold font-mono text-emerald-700">
                {claimCase.currencySymbol || '$'}{report.coverage.allowedAmount.toLocaleString()}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
