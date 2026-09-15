import React, { useState } from 'react';
import { 
  FileText, 
  Stethoscope, 
  Receipt, 
  User, 
  AlertOctagon, 
  Check, 
  AlertTriangle, 
  Circle,
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Download, 
  Send, 
  FileSearch,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { ClaimCase, DocumentItem } from '../types';
import { AnnotationFindings } from './AnnotationFindings';
import { RiskSpectrum } from './RiskSpectrum';

interface InvestigationWorkspaceProps {
  currentCase: ClaimCase;
  onRequestEvidenceModal: () => void;
  onOpenDocViewer: (docTitle?: string) => void;
  onGenerateReport: () => void;
}

export const InvestigationWorkspace: React.FC<InvestigationWorkspaceProps> = ({
  currentCase,
  onRequestEvidenceModal,
  onOpenDocViewer,
  onGenerateReport,
}) => {
  const [activeTab, setActiveTab] = useState<'map' | 'findings' | 'adjudication' | 'missing'>('map');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('claim');

  const { report } = currentCase;

  // Horizontal journey steps
  const journeySteps = [
    { label: 'SUBMITTED', status: 'completed', date: 'Aug 16' },
    { label: 'EXTRACTED', status: 'completed', date: 'Aug 16' },
    { label: 'VERIFIED', status: 'completed', date: 'Aug 17' },
    { label: 'ANALYZED', status: 'completed', date: 'Aug 17' },
    { label: 'REVIEW', status: 'current', date: 'Active Now' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Distinctive Top Header */}
      <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-6 shadow-paper relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Main Identity Block */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-[#F3F1EB] text-slate-800 font-bold px-2.5 py-1 rounded-md border border-[#E3E0D8]">
                {currentCase.claimNumber}
              </span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-slate-600">Policy: {currentCase.policyNumber}</span>
              <span className="text-slate-400">&bull;</span>
              <span className="capitalize text-slate-600">Incident: {currentCase.dateOfIncident}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {currentCase.claimantName}
              </h1>
              <span className="text-xl sm:text-2xl font-mono font-bold text-indigo-700 bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-0.5 rounded-xl">
                {currentCase.displayAmount || `$${currentCase.claimedAmount.toLocaleString()}`}
              </span>
            </div>

            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {currentCase.description}
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onRequestEvidenceModal}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-paper"
            >
              <Send className="w-3.5 h-3.5 text-indigo-300" />
              <span>Request Evidence (RFI)</span>
            </button>

            <button
              onClick={onGenerateReport}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8F6F0] text-slate-800 text-xs font-semibold flex items-center gap-1.5 border border-[#DCD9D0] transition-all shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>SIU Dossier</span>
            </button>
          </div>

        </div>

        {/* 2. Horizontal Investigation Journey */}
        <div className="mt-6 pt-5 border-t border-[#F2EFE9]">
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-3">
            Investigation Milestone Journey
          </p>

          <div className="grid grid-cols-5 gap-2 relative">
            {journeySteps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={step.label} className="relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    {idx < journeySteps.length - 1 && (
                      <div
                        className={`hidden sm:block flex-1 h-0.5 ${
                          isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>

                  <p
                    className={`text-[11px] font-mono font-bold tracking-wider ${
                      isCurrent
                        ? 'text-indigo-700'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {step.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#ECEAE4] pb-1 text-xs">
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'map'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F1EB]'
          }`}
        >
          <span>Evidence Map</span>
        </button>

        <button
          onClick={() => setActiveTab('findings')}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'findings'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F1EB]'
          }`}
        >
          <span>Findings &amp; Annotations ({report.findings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('adjudication')}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'adjudication'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F1EB]'
          }`}
        >
          <span>4-Question Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('missing')}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === 'missing'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F1EB]'
          }`}
        >
          <span>Missing Records ({report.missingEvidence.length})</span>
        </button>
      </div>

      {/* TAB 1: Large Evidence Map */}
      {activeTab === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Interactive Map Canvas */}
          <div className="lg:col-span-8 bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-6 shadow-paper min-h-[520px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-evidence-grid opacity-50 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                  Relational Evidence Topology
                </span>
                <p className="text-[11px] text-slate-500">
                  Showing cross-document links with verified, conflicting, and missing paths.
                </p>
              </div>

              {/* Legend of line styles as requested by user */}
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-3 h-0.5 bg-emerald-600 inline-block" />
                  <span>✓ verified</span>
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <span className="w-3 h-0.5 bg-rose-500 border-b border-dashed inline-block" />
                  <span>⚠ conflict</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-3 h-0.5 bg-slate-400 border-b border-dotted inline-block" />
                  <span>○ missing</span>
                </span>
              </div>
            </div>

            {/* Visual SVG Map Layout */}
            <div className="relative flex-1 min-h-[380px] flex items-center justify-center my-4">
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 640 380" fill="none">
                {/* Center to Policy (Top-Left) -> Verified Line */}
                <path d="M 320 190 L 160 80" stroke="#059669" strokeWidth="2" />
                
                {/* Center to Medical Report (Bottom-Left) -> Verified Line */}
                <path d="M 320 190 L 160 300" stroke="#059669" strokeWidth="2" />

                {/* Center to Hospital Bill (Top-Right) -> Conflicting Line (Dashed) */}
                <path d="M 320 190 L 480 80" stroke="#E11D48" strokeWidth="2" strokeDasharray="5 5" className="evidence-flow" />

                {/* Center to Prescription (Middle-Right) -> Verified Line */}
                <path d="M 320 190 L 480 190" stroke="#059669" strokeWidth="2" />

                {/* Center to Claimant Statement (Bottom-Right) -> Verified Line */}
                <path d="M 320 190 L 480 300" stroke="#059669" strokeWidth="2" />

                {/* Medical Report <---> Hospital Bill Conflict Arc */}
                <path d="M 160 300 C 240 380, 400 20, 480 80" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Hospital Bill to Missing Pathology (Top) -> Missing Dotted Line */}
                <path d="M 320 190 L 320 40" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 3" />
              </svg>

              {/* CENTER OBJECT: CLAIM */}
              <div
                onClick={() => setSelectedNodeId('claim')}
                className={`relative z-20 w-52 bg-white border-2 rounded-2xl p-3.5 text-center cursor-pointer transition-all shadow-paper-elevated ${
                  selectedNodeId === 'claim'
                    ? 'border-indigo-600 ring-4 ring-indigo-500/10 scale-105'
                    : 'border-slate-900'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Target Claim
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {currentCase.claimNumber}
                </p>
                <p className="text-xs font-mono font-bold text-indigo-700">
                  {currentCase.displayAmount || `$${currentCase.claimedAmount.toLocaleString()}`}
                </p>
                <div className="mt-1.5 pt-1.5 border-t border-[#F2EFE9] text-[10px] text-slate-500 font-mono">
                  {currentCase.claimantName}
                </div>
              </div>

              {/* NODE 1: Policy (Top-Left) */}
              <div
                onClick={() => setSelectedNodeId('policy')}
                className={`absolute top-2 left-2 sm:left-6 w-44 sm:w-48 bg-white border rounded-xl p-2.5 cursor-pointer shadow-paper transition-all ${
                  selectedNodeId === 'policy'
                    ? 'border-emerald-600 ring-2 ring-emerald-500/10'
                    : 'border-[#E2E0D8]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3 text-emerald-600" /> Policy
                  </span>
                  <span>✓ Verified</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Star Health Policy
                </p>
                <p className="text-[10px] text-slate-500 truncate">POL-STAR-44918</p>
              </div>

              {/* NODE 2: Medical Report (Bottom-Left) */}
              <div
                onClick={() => setSelectedNodeId('medical')}
                className={`absolute bottom-2 left-2 sm:left-6 w-44 sm:w-48 bg-white border rounded-xl p-2.5 cursor-pointer shadow-paper transition-all ${
                  selectedNodeId === 'medical'
                    ? 'border-emerald-600 ring-2 ring-emerald-500/10'
                    : 'border-[#E2E0D8]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3 text-emerald-600" /> Medical Report
                  </span>
                  <span>12 AUG</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Apollo Discharge Summary
                </p>
                <p className="text-[10px] text-slate-500 truncate">Dr. Vivek Mehra</p>
              </div>

              {/* NODE 3: Hospital Bill (Top-Right) */}
              <div
                onClick={() => setSelectedNodeId('bill')}
                className={`absolute top-2 right-2 sm:right-6 w-44 sm:w-48 bg-white border rounded-xl p-2.5 cursor-pointer shadow-paper transition-all ${
                  selectedNodeId === 'bill'
                    ? 'border-rose-600 ring-2 ring-rose-500/10'
                    : 'border-rose-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-rose-800 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <AlertTriangle className="w-3 h-3 text-rose-600" /> Hospital Bill
                  </span>
                  <span>⚠ Conflict</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Apollo Tax Invoice
                </p>
                <p className="text-[10px] text-rose-600 font-medium truncate">
                  Date: 14 AUG 2026
                </p>
              </div>

              {/* NODE 4: Prescription (Middle-Right) */}
              <div
                onClick={() => setSelectedNodeId('prescription')}
                className={`absolute top-[165px] right-2 sm:right-6 w-44 sm:w-48 bg-white border rounded-xl p-2.5 cursor-pointer shadow-paper transition-all ${
                  selectedNodeId === 'prescription'
                    ? 'border-emerald-600 ring-2 ring-emerald-500/10'
                    : 'border-[#E2E0D8]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3 text-emerald-600" /> Prescription
                  </span>
                  <span>✓ Aligned</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Apollo Pharmacy Rx
                </p>
                <p className="text-[10px] text-slate-500 truncate">13 AUG Post-Op</p>
              </div>

              {/* NODE 5: Claimant Statement (Bottom-Right) */}
              <div
                onClick={() => setSelectedNodeId('statement')}
                className={`absolute bottom-2 right-2 sm:right-6 w-44 sm:w-48 bg-white border rounded-xl p-2.5 cursor-pointer shadow-paper transition-all ${
                  selectedNodeId === 'statement'
                    ? 'border-emerald-600 ring-2 ring-emerald-500/10'
                    : 'border-[#E2E0D8]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3 text-emerald-600" /> Statement
                  </span>
                  <span>✓ Verified</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Claimant Declaration
                </p>
                <p className="text-[10px] text-slate-500 truncate">Signed Aug 15</p>
              </div>

              {/* NODE 6: Missing Pathology (Top-Center) */}
              <div
                onClick={() => setSelectedNodeId('missing-path')}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-44 bg-white border border-dashed rounded-xl p-2 cursor-pointer shadow-2xs transition-all ${
                  selectedNodeId === 'missing-path'
                    ? 'border-amber-600 ring-2 ring-amber-500/10'
                    : 'border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mb-0.5">
                  <span className="flex items-center gap-1 font-semibold">
                    <Circle className="w-2.5 h-2.5 text-amber-500" /> Missing Document
                  </span>
                  <span className="text-amber-700">○ Missing</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-800 truncate">
                  Histopathology Biopsy
                </p>
              </div>

            </div>

            {/* Bottom Insight Bar */}
            <div className="relative z-10 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono text-[11px]">
                Active Focus: <strong>{selectedNodeId.toUpperCase()}</strong>
              </span>
              <button
                onClick={() => onOpenDocViewer()}
                className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <span>Launch Split-Screen Research Workspace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Sidebar: Risk Spectrum & Adjudication Preview */}
          <div className="lg:col-span-4 space-y-4">
            
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

            {/* Adjudication Summary Card */}
            <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Coverage Adjudication Summary
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                {report.coverage.statusText}
              </h4>
              
              <div className="space-y-1.5 pt-2 border-t border-[#F2EFE9] text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Claimed:</span>
                  <span className="font-bold text-slate-900">
                    {currentCase.currencySymbol || '$'}{report.coverage.claimedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Authorized:</span>
                  <span className="font-bold text-emerald-700">
                    {currentCase.currencySymbol || '$'}{report.coverage.allowedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Deductible:</span>
                  <span className="text-slate-800">
                    {currentCase.currencySymbol || '$'}{report.coverage.deductible.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-rose-700">
                  <span>Unauthorized Diff:</span>
                  <span className="font-bold">
                    {currentCase.currencySymbol || '$'}{report.coverage.unauthorizedAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-2 border-t border-[#F2EFE9] leading-relaxed">
                {report.coverage.notes}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Explainable Annotation Findings */}
      {activeTab === 'findings' && (
        <AnnotationFindings
          findings={report.findings}
          onRequestEvidence={() => onRequestEvidenceModal()}
          onViewSourceDoc={(docTitle) => onOpenDocViewer(docTitle)}
        />
      )}

      {/* TAB 3: 4-Question Audit Matrix */}
      {activeTab === 'adjudication' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Question 1: Is the claim covered? */}
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-2">
            <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold px-2 py-0.5 rounded bg-[#EEF2FF]">
              Core Question 1
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              Is the claim covered under policy terms?
            </h4>
            <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-xs text-emerald-900">
              <span className="font-bold">YES (Partial with exclusions applied)</span>
              <p className="mt-1 text-emerald-800">
                Laparoscopic appendectomy is covered under Clause 2.1 emergency schedule. However, daily room rent of ₹14,000 exceeds the policy threshold cap of ₹8,000/day.
              </p>
            </div>
          </div>

          {/* Question 2: Is the evidence consistent? */}
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-2">
            <span className="text-[10px] font-mono uppercase text-rose-700 font-bold px-2 py-0.5 rounded bg-[#FFF1F2]">
              Core Question 2
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              Is the submitted evidence consistent across records?
            </h4>
            <div className="p-3 bg-[#FFF1F2] border border-[#FECDD3] rounded-xl text-xs text-rose-900">
              <span className="font-bold">INCONSISTENT (Date Conflict)</span>
              <p className="mt-1 text-rose-800">
                Dr. Mehra's discharge note states surgery took place on 12 AUG 2026. Hospital billing recorded initial admission date as 14 AUG 2026.
              </p>
            </div>
          </div>

          {/* Question 3: What information is missing? */}
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-700 font-bold px-2 py-0.5 rounded bg-[#FFFBEB]">
              Core Question 3
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              What critical information or record is missing?
            </h4>
            <div className="p-3 bg-[#FFFBEB] border border-[#FCD34D] rounded-xl text-xs text-amber-900">
              <span className="font-bold">MISSING DIAGNOSTIC HISTOPATHOLOGY</span>
              <p className="mt-1 text-amber-800">
                The surgical operative report references submitting an excised tissue specimen for biopsy; the certified lab report has not been submitted.
              </p>
            </div>
          </div>

          {/* Question 4: What needs further verification? */}
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper space-y-2">
            <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold px-2 py-0.5 rounded bg-[#EEF2FF]">
              Core Question 4
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              What needs further investigator verification?
            </h4>
            <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800">
              <span className="font-bold">HOSPITAL ADMISSION LOG CONFIRMATION</span>
              <p className="mt-1 text-slate-600">
                Hospital billing ledger must clarify whether admission date 14 AUG was an administrative clerical entry or actual check-in.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: Missing Records & Request for Information */}
      {activeTab === 'missing' && (
        <div className="space-y-4">
          <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Missing Evidence Records
            </h3>
            <div className="space-y-3">
              {report.missingEvidence.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-[#E2E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {item.importance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">Target Entity: {item.targetParty.toUpperCase()}</p>
                  </div>

                  <button
                    onClick={onRequestEvidenceModal}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-2xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Generate RFI</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
