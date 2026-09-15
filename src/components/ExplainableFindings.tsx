import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Quote, 
  ArrowRight, 
  Check, 
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ExplainableFinding } from '../types';

interface ExplainableFindingsProps {
  findings: ExplainableFinding[];
  onUpdateFindingStatus?: (findingId: string, newStatus: ExplainableFinding['status']) => void;
  onViewDocument?: (docTitle: string) => void;
}

export const ExplainableFindings: React.FC<ExplainableFindingsProps> = ({
  findings,
  onUpdateFindingStatus,
  onViewDocument,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(findings.map((f) => f.category)))];

  const filteredFindings = activeCategory === 'all'
    ? findings
    : findings.filter((f) => f.category === activeCategory);

  const getSeverityBadge = (severity: ExplainableFinding['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/60 border border-rose-800 text-rose-300">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            Critical Red Flag
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/60 border border-amber-800 text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Discrepancy Warning
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Verified & Cleared
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            Audit Information
          </span>
        );
    }
  };

  const copyFindingCitation = (finding: ExplainableFinding) => {
    const text = `ClaimGuard Finding: ${finding.title}\nCategory: ${finding.category}\nWhat Happened: ${finding.whatHappened}\nEvidence: ${finding.supportingEvidence.map(e => `[${e.documentTitle} (${e.reference})]: "${e.excerpt}"`).join('\n')}\nWhy It Matters: ${finding.whyItMatters}\nNext Step: ${finding.whatShouldHappenNext}`;
    navigator.clipboard.writeText(text);
    setCopiedId(finding.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header and Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-100">Explainable Investigation Findings</h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {findings.length} flags generated
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Every flag systematically answers: <span className="text-slate-300 font-medium">What happened? &rarr; What evidence supports it? &rarr; Why does it matter? &rarr; What should happen next?</span>
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg border font-medium capitalize transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-slate-850 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => {
          const isResolved = finding.status === 'resolved';

          return (
            <div
              key={finding.id}
              className={`bg-slate-900 border rounded-xl overflow-hidden shadow-sm transition-all ${
                finding.severity === 'critical'
                  ? 'border-rose-900/40 hover:border-rose-700/60'
                  : finding.severity === 'warning'
                  ? 'border-amber-900/40 hover:border-amber-700/60'
                  : 'border-slate-800 hover:border-slate-700'
              } ${isResolved ? 'opacity-70' : ''}`}
            >
              {/* Finding Title Bar */}
              <div className="px-5 py-3.5 bg-slate-850 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {getSeverityBadge(finding.severity)}
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span>{finding.title}</span>
                      {isResolved && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.2 rounded font-normal">
                          Investigator Resolved
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-400">{finding.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyFindingCitation(finding)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                    title="Copy finding & citations for claim file"
                  >
                    {copiedId === finding.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Copy Dossier Entry</span>
                  </button>

                  {onUpdateFindingStatus && (
                    <button
                      onClick={() =>
                        onUpdateFindingStatus(
                          finding.id,
                          isResolved ? 'open' : 'resolved'
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isResolved
                          ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                          : 'bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:bg-emerald-900/40'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isResolved ? 'Re-Open Flag' : 'Mark Investigated'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* The 4-Question Explainability Matrix */}
              <div className="p-5 space-y-4 text-xs">
                
                {/* 1. What Happened? */}
                <div className="bg-slate-850/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-1 text-slate-300 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 flex items-center justify-center text-[10px] font-mono">
                      1
                    </span>
                    <span className="text-slate-200">What happened?</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed pl-7 [&_strong]:font-bold [&_strong]:text-amber-200">
                    <Markdown>{finding.whatHappened}</Markdown>
                  </div>
                </div>

                {/* 2. What Evidence Supports It? */}
                <div className="bg-slate-850/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-2 text-slate-300 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 flex items-center justify-center text-[10px] font-mono">
                      2
                    </span>
                    <span className="text-slate-200">What evidence supports it?</span>
                    <span className="text-[10px] text-slate-400">({finding.supportingEvidence.length} citations)</span>
                  </div>

                  <div className="pl-7 space-y-2">
                    {finding.supportingEvidence.map((ev, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 relative group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                            <Quote className="w-3 h-3 text-slate-400" />
                            {ev.documentTitle}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                              {ev.reference}
                            </span>
                            {onViewDocument && (
                              <button
                                onClick={() => onViewDocument(ev.documentTitle)}
                                className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-0.5"
                              >
                                View Doc <ExternalLink className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-slate-300 italic text-[11px] leading-normal border-l-2 border-blue-500/40 pl-2">
                          "{ev.excerpt}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Why Does It Matter? */}
                <div className="bg-slate-850/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-1 text-slate-300 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center text-[10px] font-mono">
                      3
                    </span>
                    <span className="text-slate-200">Why does it matter?</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed pl-7 [&_strong]:font-bold [&_strong]:text-amber-200">
                    <Markdown>{finding.whyItMatters}</Markdown>
                  </div>
                </div>

                {/* 4. What Should Happen Next? */}
                <div className="bg-blue-950/20 p-3.5 rounded-lg border border-blue-900/40">
                  <div className="flex items-center gap-2 mb-1 text-blue-300 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono shadow-xs">
                      4
                    </span>
                    <span className="text-blue-200 font-bold">What should happen next?</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded">Recommended Action</span>
                  </div>
                  <div className="text-blue-100 font-medium leading-relaxed pl-7 flex items-start gap-1.5 [&_strong]:font-bold [&_strong]:text-white">
                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <Markdown>{finding.whatShouldHappenNext}</Markdown>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
