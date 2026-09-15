import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, FileSearch, ShieldAlert, GitGraph, Clock } from 'lucide-react';
import { ClaimCase } from '../types';

interface ReverifyProgressModalProps {
  isOpen: boolean;
  claim: ClaimCase;
  isAnalyzing: boolean;
  onComplete: () => void;
}

interface Step {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const ReverifyProgressModal: React.FC<ReverifyProgressModalProps> = ({
  isOpen,
  claim,
  isAnalyzing,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [elapsed, setElapsed] = useState(0);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Document Ingestion & Multi-Source Extraction',
      desc: `Processing ${claim.documents?.length || 0} evidence records for ${claim.claimantName}`,
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      id: 2,
      title: 'Policy Schedule & Sub-Limit Audit',
      desc: `Auditing policy covenants & limits under Policy #${claim.policyNumber}`,
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      id: 3,
      title: 'Timeline & Chronology Cross-Examination',
      desc: `Corroborating provider timestamps against incident date (${claim.dateOfIncident})`,
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: 4,
      title: 'SIU Forensic Matrix & Relational Graph',
      desc: 'Corroborating discrepancy findings, statutory actions, and financial liability',
      icon: <GitGraph className="w-4 h-4" />,
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(1);
      setElapsed(0);
      return;
    }

    const timer = setInterval(() => {
      setElapsed((prev) => +(prev + 0.1).toFixed(1));
    }, 100);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 450);

    return () => {
      clearInterval(timer);
      clearInterval(stepInterval);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isAnalyzing && isOpen) {
      setActiveStep(5); // All complete
      const timeout = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timeout);
    }
  }, [isAnalyzing, isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm animate-fade-in">
      <div 
        id="reverify-progress-modal"
        className="w-full max-w-lg bg-[#FAF9F5] border border-[#ECEAE4] rounded-2xl shadow-paper-elevated p-6 overflow-hidden relative animate-scale-up"
      >
        {/* Subtle accent header line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                  Fast AI Pipeline
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {elapsed}s elapsed
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Re-verifying Claim #{claim.claimNumber}
              </h3>
              <p className="text-xs text-slate-600">
                {claim.claimantName} &bull; {claim.displayAmount || `₹${claim.claimedAmount.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3 mb-6">
          {steps.map((step) => {
            const isFinished = activeStep > step.id;
            const isCurrent = activeStep === step.id;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                  isFinished
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                    : isCurrent
                    ? 'bg-white border-indigo-200 shadow-sm text-slate-900 ring-1 ring-indigo-100'
                    : 'bg-white/40 border-[#ECEAE4] text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isFinished
                      ? 'bg-emerald-100 text-emerald-700'
                      : isCurrent
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  ) : (
                    step.icon
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${isCurrent ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {step.title}
                    </p>
                    {isFinished && (
                      <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                        VERIFIED
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-indigo-600 font-semibold animate-pulse">
                        RUNNING...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer status banner */}
        <div className="p-3 bg-white border border-[#ECEAE4] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-600 font-medium">
              {activeStep >= 5
                ? 'Investigation dossier successfully verified & updated'
                : 'Correlating evidence across medical notes & hospital billing records...'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            ClaimGuard Multimodal Pipeline
          </span>
        </div>
      </div>
    </div>
  );
};
