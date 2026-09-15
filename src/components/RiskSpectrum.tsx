import React from 'react';
import { RiskLevel } from '../types';

interface RiskSpectrumProps {
  score: number;
  level: RiskLevel;
  contributingFactors?: Array<{
    label: string;
    impact: 'increase' | 'decrease';
  }>;
}

export const RiskSpectrum: React.FC<RiskSpectrumProps> = ({
  score,
  level,
  contributingFactors = [
    { label: 'Date conflict', impact: 'increase' },
    { label: 'Missing diagnostic report', impact: 'increase' },
    { label: 'Amount verified', impact: 'decrease' },
    { label: 'Policy match', impact: 'decrease' },
  ],
}) => {
  // Score is 0 - 100
  const markerPercent = Math.min(96, Math.max(4, score));

  return (
    <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl p-5 shadow-paper">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
            Risk Spectrum
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-slate-800">
            {score}/100 &bull; {level}
          </span>
        </div>
        <span className="text-[11px] text-slate-500">Multimodal Weighting</span>
      </div>

      {/* The Spectrum Bar */}
      <div className="relative py-4">
        {/* Track */}
        <div className="h-1.5 w-full bg-linear-to-r from-emerald-200 via-amber-200 to-rose-300 rounded-full" />

        {/* Labels under track */}
        <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-2">
          <span>LOW</span>
          <span className="text-slate-600 font-medium">MEDIUM</span>
          <span>HIGH</span>
        </div>

        {/* Dynamic Marker */}
        <div
          style={{ left: `${markerPercent}%` }}
          className="absolute top-1.5 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-500"
        >
          <div className="w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-800 mt-1 bg-white px-1.5 py-0.5 rounded border border-[#ECEAE4] shadow-2xs">
            {score}
          </span>
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="pt-3 border-t border-[#F2EFE9] mt-2">
        <p className="text-[11px] font-medium text-slate-500 mb-2">
          Contributing Evidence Factors:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {contributingFactors.map((factor, idx) => {
            const isIncrease = factor.impact === 'increase';
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                  isIncrease
                    ? 'bg-[#FFF7ED] border-[#FED7AA] text-amber-800'
                    : 'bg-[#F0FDF4] border-[#BBF7D0] text-emerald-800'
                }`}
              >
                <span>{factor.label}</span>
                <span className="font-bold">{isIncrease ? '+' : '−'}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
