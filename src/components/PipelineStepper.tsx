import React from 'react';
import { 
  FileUp, 
  Binary, 
  Network, 
  CheckCheck, 
  AlertTriangle, 
  Search, 
  UserCheck 
} from 'lucide-react';

interface PipelineStepperProps {
  currentStep?: number;
  onStepClick?: (stepIndex: number) => void;
  metrics: {
    docCount: number;
    verificationsCount: number;
    issuesCount: number;
    missingCount: number;
  };
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentStep = 6,
  onStepClick,
  metrics,
}) => {
  const steps = [
    { number: '01', title: 'Submit Claim', sub: 'Details & Evidence', icon: FileUp, detail: `${metrics.docCount} Docs` },
    { number: '02', title: 'Extract Evidence', sub: 'Multimodal AI', icon: Binary, detail: '100% Parsed' },
    { number: '03', title: 'Connect Evidence', sub: 'Evidence Graph', icon: Network, detail: 'Graph Linked' },
    { number: '04', title: 'Verify', sub: 'Cross-Check', icon: CheckCheck, detail: `${metrics.verificationsCount} Checks` },
    { number: '05', title: 'Detect Issues', sub: 'Inconsistencies', icon: AlertTriangle, detail: `${metrics.issuesCount} Flags` },
    { number: '06', title: 'Investigate', sub: 'Explainable AI', icon: Search, detail: 'Completed' },
    { number: '07', title: 'Take Action', sub: 'Human-in-the-Loop', icon: UserCheck, detail: 'Action Desk' },
  ];

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Desktop Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;

            return (
              <button
                key={step.number}
                id={`pipeline-step-${idx + 1}`}
                onClick={() => onStepClick && onStepClick(idx)}
                className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all border ${
                  isCurrent
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-200 ring-1 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-slate-850/40 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    : 'bg-slate-900/20 border-slate-850 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : isCompleted
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                      {step.number}
                    </span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800/80 text-slate-300 font-mono">
                      {step.detail}
                    </span>
                  </div>
                  <p className="text-xs font-medium truncate text-slate-100">{step.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{step.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
