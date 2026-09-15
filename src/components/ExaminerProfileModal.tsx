import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Fingerprint, 
  AlertTriangle,
  Scale,
  Sparkles
} from 'lucide-react';
import { ClaimCase } from '../types';

interface ExaminerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCase?: ClaimCase;
  totalCases?: number;
}

export const ExaminerProfileModal: React.FC<ExaminerProfileModalProps> = ({
  isOpen,
  onClose,
  activeCase,
  totalCases = 5,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div 
        id="siu-examiner-profile-modal"
        className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl w-full max-w-2xl shadow-paper-elevated overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
      >
        {/* Modal Top Toolbar */}
        <div className="p-4 border-b border-[#ECEAE4] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  Official SIU Credential
                </span>
                <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Session
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                Special Investigation Unit (SIU) Examiner Profile
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F3F1EB] transition-colors"
            title="Close Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900 text-xs">
          
          {/* Primary ID Card Banner */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-paper relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Scale className="w-48 h-48" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Profile Avatar with Clearance Ring */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-400 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center font-serif text-2xl font-bold text-indigo-200">
                    VS
                  </div>
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center"
                  title="Level 4 Certified Investigator"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Identity & Office */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-white font-serif">
                    Vikramaditya Sengupta, CFE
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    Badge #SIU-IND-40918
                  </span>
                </div>
                
                <p className="text-xs text-indigo-200/90 font-medium mt-0.5">
                  Lead Forensic Adjudicator &bull; Special Investigation Unit
                </p>
                
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    Claims Fraud &amp; Forensic Adjudication Division
                  </span>
                  <span>&bull;</span>
                  <span>Clearance Level IV</span>
                </p>
              </div>
            </div>

            {/* Quick Badges Row */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-3.5 h-3.5 text-sky-400" />
                <span>IRDAI Forensic Reg: <strong>IRDA/SIU/2026/0881</strong></span>
              </div>
              <button 
                onClick={() => handleCopy('SIU-IND-40918-IRDA-2026', 'cert')}
                className="text-indigo-300 hover:text-white flex items-center gap-1 text-[10px] transition-colors"
              >
                {copiedKey === 'cert' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'cert' ? 'Copied' : 'Copy Cert ID'}</span>
              </button>
            </div>
          </div>

          {/* Forensic Performance & Adjudication Portfolio Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Adjudication Track Record &amp; Authority</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-[#FAF9F5] border border-[#ECEAE4] p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Leakage Prevented</span>
                <p className="text-base font-bold text-emerald-700 mt-0.5">₹48.6 Lakhs</p>
                <span className="text-[9px] text-slate-400 font-sans">Disallowed excess &amp; fraud</span>
              </div>

              <div className="bg-[#FAF9F5] border border-[#ECEAE4] p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Forensic Precision</span>
                <p className="text-base font-bold text-indigo-700 mt-0.5">98.4%</p>
                <span className="text-[9px] text-slate-400 font-sans">Corroborated citations</span>
              </div>

              <div className="bg-[#FAF9F5] border border-[#ECEAE4] p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Active Docket</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">{totalCases} Claims</p>
                <span className="text-[9px] text-slate-400 font-sans">Under active review</span>
              </div>

              <div className="bg-[#FAF9F5] border border-[#ECEAE4] p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Sign-off Limit</span>
                <p className="text-base font-bold text-amber-700 mt-0.5">₹25,00,000</p>
                <span className="text-[9px] text-slate-400 font-sans">Per claim authorization</span>
              </div>
            </div>
          </div>

          {/* Delegated Statutory Powers */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>Delegated Statutory Powers &amp; Regulatory Mandate</span>
            </h4>

            <div className="p-3.5 bg-white border border-[#E2E0D8] rounded-xl space-y-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 45 Investigation Authority</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Empowered to demand Operation Theatre (OT) Entry Registers, attending physician progress notes, and hospital admission logs to resolve chronological contradictions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#ECEAE4]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Clause 4.3 Tariff Sub-limit Deduction Enforcement</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Authority to disallow room rent surcharges exceeding policy sub-limits (e.g. ₹8,000/day cap vs ₹14,000 billed) and enforce claimant liability adjustments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#ECEAE4]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Clause 6.2 Histopathology Verification Mandate</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Authorized to withhold surgical claims until certified laboratory histopathology confirmation is submitted by the billing hospital.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Session & Forensic Security Card */}
          <div className="bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl p-4 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-500 uppercase text-[10px]">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                MFA Authentication:
              </span>
              <span className="font-bold text-emerald-700 font-sans flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> FIDO2 Hardware Token Active
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-500 uppercase text-[10px]">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Session Duration:
              </span>
              <span className="font-bold text-slate-900 font-sans">
                Active &bull; Logged in at 09:15 AM IST
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-500 uppercase text-[10px]">
                <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
                Current Active Focus:
              </span>
              <span className="font-bold text-indigo-700 font-sans">
                Claim #{activeCase?.claimNumber || 'CLM-20481'} ({activeCase?.claimantName || 'Aarav Sharma'})
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#ECEAE4] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-mono">
            Signed by: <strong>V. Sengupta, CFE (Examiner #40918)</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleCopy('Vikramaditya Sengupta | Lead SIU Examiner | ID: SIU-IND-40918 | IRDA/SIU/2026/0881 | Digital Cert: SHA256-VALID', 'full')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white border border-[#DCD9D0] hover:bg-[#F3F1EB] text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              {copiedKey === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedKey === 'full' ? 'Credentials Copied' : 'Copy Credentials'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-paper"
            >
              Close Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
