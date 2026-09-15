import React, { useState } from 'react';
import { 
  FileCheck2, 
  FileText, 
  Stethoscope, 
  Receipt, 
  User, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Send
} from 'lucide-react';
import { ClaimCase, DocumentItem } from '../types';
import { RiskSpectrum } from './RiskSpectrum';

interface ClaimIntelligenceCanvasProps {
  currentCase: ClaimCase;
  onOpenDocument?: (docTitle: string) => void;
  onRequestEvidence?: () => void;
}

export const ClaimIntelligenceCanvas: React.FC<ClaimIntelligenceCanvasProps> = ({
  currentCase,
  onOpenDocument,
  onRequestEvidence,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(
    currentCase.documents[0]?.id || ''
  );

  const selectedDoc = currentCase.documents.find((d) => d.id === selectedDocId) || currentCase.documents[0];
  const { report } = currentCase;

  const getDocIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'policy':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'medical_report':
        return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      case 'hospital_bill':
        return <AlertOctagon className="w-4 h-4 text-amber-600" />;
      case 'receipt':
        return <Receipt className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-purple-600" />;
    }
  };

  const getDocStatusBadge = (doc: DocumentItem) => {
    const hasMismatch = doc.extractedFacts.some((f) => f.flag === 'mismatch' || f.flag === 'suspicious');
    if (hasMismatch) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#FFF1F2] text-rose-700 border border-[#FECDD3]">
          <AlertOctagon className="w-2.5 h-2.5 text-rose-500" /> Conflict
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#F0FDF4] text-emerald-700 border border-[#BBF7D0]">
        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> Verified
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Claim Intelligence Canvas
            </h2>
            <span className="text-[10px] font-mono uppercase bg-[#F3F1EB] text-slate-600 px-2 py-0.5 rounded border border-[#E3E0D8]">
              Active Multi-Evidence Network
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Relational evidence topology linking policy, bills, physician summaries, and claimant declarations.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
          <span>Claim Ref:</span>
          <span className="font-bold text-slate-800 bg-white px-2 py-1 rounded border border-[#ECEAE4]">
            {currentCase.claimNumber}
          </span>
        </div>
      </div>

      {/* Main Grid: Intelligence Canvas (Left 8 cols) + Investigation Brief (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Investigation Canvas */}
        <div className="lg:col-span-8 bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-6 shadow-paper relative overflow-hidden flex flex-col justify-between min-h-[500px]">
          
          {/* Subtle dotted background grid */}
          <div className="absolute inset-0 bg-evidence-grid opacity-50 pointer-events-none" />

          {/* Top Canvas Bar */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#F2EFE9]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono">
                Central Case Object &bull; {currentCase.claimantName}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Click any evidence card to inspect citations
            </span>
          </div>

          {/* Interactive Topology Composition Area */}
          <div className="relative flex-1 my-4 min-h-[380px] flex items-center justify-center">
            
            {/* SVG Relationship Connector Paths */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 640 380"
              fill="none"
            >
              {/* Paths from center (320, 190) to each card position */}
              {/* Top-Left: Policy (x: 100, y: 55) */}
              <path d="M 320 190 L 160 70" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="240" cy="130" r="3" fill="#6366F1" />

              {/* Bottom-Left: Medical Report (x: 100, y: 310) */}
              <path d="M 320 190 L 160 310" stroke="#10B981" strokeWidth="1.5" />
              <circle cx="240" cy="250" r="3" fill="#10B981" />

              {/* Top-Right: Hospital Bill (x: 540, y: 55) */}
              <path
                d="M 320 190 L 480 70"
                stroke="#F43F5E"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="evidence-flow"
              />
              <circle cx="400" cy="130" r="3" fill="#F43F5E" />

              {/* Middle-Right: Prescription (x: 540, y: 200) */}
              <path d="M 320 190 L 480 200" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="400" cy="195" r="3" fill="#3B82F6" />

              {/* Bottom-Right: Statement (x: 540, y: 320) */}
              <path d="M 320 190 L 480 320" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="400" cy="255" r="3" fill="#8B5CF6" />
            </svg>

            {/* Central Claim Object Card */}
            <div className="relative z-20 w-64 bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-paper-elevated text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-800 mx-auto flex items-center justify-center mb-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                Primary Claim File
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {currentCase.claimantName}
              </h3>
              <p className="text-sm font-mono font-bold text-indigo-700 mt-1">
                {currentCase.displayAmount || `$${currentCase.claimedAmount.toLocaleString()}`}
              </p>
              <div className="mt-2.5 pt-2 border-t border-[#F2EFE9] flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                <span>{currentCase.claimNumber}</span>
                <span>&bull;</span>
                <span className="capitalize">{currentCase.claimType}</span>
              </div>
            </div>

            {/* Connected Evidence Card 1: Policy (Top Left) */}
            <div
              onClick={() => setSelectedDocId(currentCase.documents[0]?.id)}
              className={`absolute top-2 left-2 sm:left-4 w-48 sm:w-52 bg-white border rounded-xl p-3 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover ${
                selectedDocId === currentCase.documents[0]?.id
                  ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                  : 'border-[#E2E0D8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3 text-indigo-600" /> Policy
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-[#F0FDF4] px-1.5 py-0.2 rounded border border-[#BBF7D0]">
                  ✓ Terms Match
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentCase.documents[0]?.title}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                {currentCase.policyNumber} &bull; Deductible verified
              </p>
            </div>

            {/* Connected Evidence Card 2: Medical Report (Bottom Left) */}
            <div
              onClick={() => setSelectedDocId(currentCase.documents[1]?.id)}
              className={`absolute bottom-2 left-2 sm:left-4 w-48 sm:w-52 bg-white border rounded-xl p-3 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover ${
                selectedDocId === currentCase.documents[1]?.id
                  ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                  : 'border-[#E2E0D8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                  <Stethoscope className="w-3 h-3 text-emerald-600" /> Medical Report
                </span>
                <span className="text-[10px] font-mono text-slate-500">12 AUG</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentCase.documents[1]?.title}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                Operative &amp; Clinical Summary
              </p>
            </div>

            {/* Connected Evidence Card 3: Hospital Bill (Top Right) */}
            <div
              onClick={() => setSelectedDocId(currentCase.documents[2]?.id)}
              className={`absolute top-2 right-2 sm:right-4 w-48 sm:w-52 bg-white border rounded-xl p-3 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover ${
                selectedDocId === currentCase.documents[2]?.id
                  ? 'border-rose-500 ring-2 ring-rose-500/10'
                  : 'border-[#FCA5A5]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                  <AlertOctagon className="w-3 h-3 text-rose-600" /> Hospital Bill
                </span>
                <span className="text-[10px] font-mono text-rose-700 bg-[#FFF1F2] px-1.5 py-0.2 rounded border border-[#FECDD3]">
                  ⚠ Date Conflict
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentCase.documents[2]?.title}
              </p>
              <p className="text-[10px] text-rose-600 font-medium truncate mt-0.5">
                Admission 14 AUG contradicts 12 AUG
              </p>
            </div>

            {/* Connected Evidence Card 4: Prescription (Middle Right) */}
            <div
              onClick={() => setSelectedDocId(currentCase.documents[3]?.id)}
              className={`absolute top-[160px] right-2 sm:right-4 w-48 sm:w-52 bg-white border rounded-xl p-3 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover ${
                selectedDocId === currentCase.documents[3]?.id
                  ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                  : 'border-[#E2E0D8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                  <Receipt className="w-3 h-3 text-blue-600" /> Prescription
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-[#F0FDF4] px-1.5 py-0.2 rounded">
                  ✓ Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentCase.documents[3]?.title || 'Prescription & Pharmacy'}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                Pharmacy records aligned
              </p>
            </div>

            {/* Connected Evidence Card 5: Claimant Statement (Bottom Right) */}
            <div
              onClick={() => setSelectedDocId(currentCase.documents[4]?.id)}
              className={`absolute bottom-2 right-2 sm:right-4 w-48 sm:w-52 bg-white border rounded-xl p-3 cursor-pointer transition-all shadow-paper hover:shadow-paper-hover ${
                selectedDocId === currentCase.documents[4]?.id
                  ? 'border-indigo-600 ring-2 ring-indigo-500/10'
                  : 'border-[#E2E0D8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1">
                  <User className="w-3 h-3 text-purple-600" /> Statement
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-[#F0FDF4] px-1.5 py-0.2 rounded">
                  ✓ Verified
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {currentCase.documents[4]?.title || 'Claimant Sworn Declaration'}
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                Signed declaration on file
              </p>
            </div>

          </div>

          {/* Bottom Card Preview / Drawer */}
          {selectedDoc && (
            <div className="relative z-10 pt-3 border-t border-[#F2EFE9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                  {getDocIcon(selectedDoc.type)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    Selected Evidence: {selectedDoc.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {selectedDoc.summary}
                  </p>
                </div>
              </div>

              {onOpenDocument && (
                <button
                  onClick={() => onOpenDocument(selectedDoc.title)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#DCD9D0] hover:bg-[#F8F6F0] text-slate-700 text-xs font-medium shrink-0 flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Open in Document Viewer</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right: Compact Investigation Brief (Slide / Specification exact match) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <h3 className="text-sm font-bold tracking-tight text-slate-900 uppercase font-mono">
                Investigation Brief
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-emerald-800 border border-[#BBF7D0]">
                Live AI Audit
              </span>
            </div>

            {/* 1. Risk */}
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                Risk Rating
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-base font-bold text-slate-900">
                  {report.riskLevel === 'MEDIUM' ? 'Medium' : report.riskLevel}
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-amber-800 border border-[#FED7AA]">
                  {report.riskScore}/100 Exposure
                </span>
              </div>
            </div>

            {/* 2. Coverage */}
            <div className="pt-2 border-t border-[#F2EFE9]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                Coverage Adjudication
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-semibold text-emerald-800">
                  Likely Eligible
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Clause 2.1 Applied
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Emergency appendectomy covered after deductible. Room upgrade cap requires deduction.
              </p>
            </div>

            {/* 3. Evidence */}
            <div className="pt-2 border-t border-[#F2EFE9]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                Evidence Status
              </p>
              <p className="text-xs font-medium text-slate-800 mt-1 flex items-center gap-1.5">
                <span className="text-emerald-700 font-bold">4 verified</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-rose-600 font-bold">1 conflict</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-amber-700 font-bold">1 missing</span>
              </p>
            </div>

            {/* 4. Next Action */}
            <div className="pt-2 border-t border-[#F2EFE9] bg-[#F8FAFC] -mx-5 -mb-5 p-4 rounded-b-2xl border-b border-x border-[#E2E8F0]">
              <p className="text-[10px] uppercase font-mono tracking-wider text-indigo-700 font-semibold">
                Next Recommended Action
              </p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">
                Request diagnostic report
              </p>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Histopathology biopsy report omitted from hospital filing. Transmit automated RFI notice to Apollo Laboratories.
              </p>

              {onRequestEvidence && (
                <button
                  onClick={onRequestEvidence}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit RFI Notice Now</span>
                </button>
              )}
            </div>

          </div>

          {/* Risk Spectrum Embed */}
          <RiskSpectrum
            score={report.riskScore}
            level={report.riskLevel}
            contributingFactors={[
              { label: 'Date conflict', impact: 'increase' },
              { label: 'Missing diagnostic report', impact: 'increase' },
              { label: 'Amount verified', impact: 'decrease' },
              { label: 'Policy match', impact: 'decrease' },
            ]}
          />

        </div>

      </div>

    </div>
  );
};
