import React, { useState } from 'react';
import { 
  FileText, 
  Stethoscope, 
  Receipt, 
  User, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ClaimCase, DocumentItem } from '../types';

interface DocumentIntelligenceViewerProps {
  currentCase: ClaimCase;
  initialDocTitle?: string;
  onRequestEvidence?: () => void;
}

export const DocumentIntelligenceViewer: React.FC<DocumentIntelligenceViewerProps> = ({
  currentCase,
  initialDocTitle,
  onRequestEvidence,
}) => {
  const initialIndex = initialDocTitle
    ? currentCase.documents.findIndex((d) => d.title.toLowerCase().includes(initialDocTitle.toLowerCase()))
    : 0;

  const [activeDocIndex, setActiveDocIndex] = useState<number>(
    initialIndex >= 0 ? initialIndex : 0
  );

  const [selectedFactIndex, setSelectedFactIndex] = useState<number>(0);

  const activeDoc = currentCase.documents[activeDocIndex] || currentCase.documents[0];

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

  // Format document content with highlighted spans for facts
  const renderHighlightedContent = (content: string) => {
    // Keywords to highlight visually
    const highlightWords = [
      { word: '12 AUG 2026', type: 'emerald' },
      { word: '14 AUG 2026', type: 'rose' },
      { word: '₹14,000/day', type: 'amber' },
      { word: '₹8,000.00', type: 'indigo' },
      { word: 'Histopathology', type: 'amber' },
      { word: '₹4,85,000.00', type: 'indigo' },
      { word: 'Clause 2.1', type: 'indigo' },
      { word: 'Clause 4.3', type: 'indigo' },
    ];

    let highlighted = content;
    highlightWords.forEach(({ word, type }) => {
      const regex = new RegExp(`(${word})`, 'gi');
      let styleClass = 'bg-indigo-50 text-indigo-900 border-b border-indigo-300 font-semibold px-1 rounded';
      if (type === 'emerald') styleClass = 'bg-emerald-100/70 text-emerald-950 border-b-2 border-emerald-400 font-bold px-1 rounded';
      if (type === 'rose') styleClass = 'bg-rose-100/70 text-rose-950 border-b-2 border-rose-400 font-bold px-1 rounded animate-pulse';
      if (type === 'amber') styleClass = 'bg-amber-100/70 text-amber-950 border-b-2 border-amber-400 font-bold px-1 rounded';

      highlighted = highlighted.replace(regex, `<mark class="${styleClass}">$1</mark>`);
    });

    return <div dangerouslySetInnerHTML={{ __html: highlighted.replace(/\n/g, '<br />') }} />;
  };

  return (
    <div className="space-y-4">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#ECEAE4]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>Split-Screen Document Intelligence</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EEF2FF] text-indigo-700 border border-[#C7D2FE]">
              Active Cross-Examination
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time entity extraction with traceable provenance to original evidentiary records.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Case: <strong className="text-slate-900">{currentCase.claimNumber}</strong> &bull; {currentCase.claimantName}
        </div>
      </div>

      {/* 3-Column Split Screen: Left Stack (3 cols) | Center Preview (6 cols) | Right Annotations (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* COLUMN 1: Document Stack (Left) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
              Document Stack ({currentCase.documents.length})
            </span>
            <span className="text-[10px] font-mono text-slate-400">Indexed</span>
          </div>

          <div className="space-y-2">
            {currentCase.documents.map((doc, idx) => {
              const isActive = idx === activeDocIndex;
              const hasMismatch = doc.extractedFacts.some((f) => f.flag === 'mismatch' || f.flag === 'suspicious');

              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setActiveDocIndex(idx);
                    setSelectedFactIndex(0);
                  }}
                  className={`bg-[#FDFCFA] border rounded-xl p-3 cursor-pointer transition-all shadow-2xs hover:shadow-paper ${
                    isActive
                      ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/10'
                      : 'border-[#ECEAE4]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold flex items-center gap-1.5">
                      {getDocIcon(doc.type)}
                      <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {doc.date}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {doc.title}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400 truncate max-w-[130px]">
                      {doc.authorOrProvider}
                    </span>
                    {hasMismatch ? (
                      <span className="text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        ⚠ Flagged
                      </span>
                    ) : (
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Large Document Preview (Center) */}
        <div className="lg:col-span-6 bg-white border border-[#E2E0D8] rounded-2xl p-6 shadow-paper min-h-[560px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Header with paper document metadata */}
          <div className="pb-4 border-b border-[#ECEAE4] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-700 font-bold bg-[#EEF2FF] px-2 py-0.5 rounded">
                Verified Evidentiary File
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                {activeDoc.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Author: {activeDoc.authorOrProvider} &bull; Recorded: {activeDoc.date}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-400 bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#ECEAE4]">
              OCR Hash Verified &bull; 300 DPI
            </div>
          </div>

          {/* Paper Content Body with Monospaced Typography */}
          <div className="my-5 p-5 bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl font-mono text-xs leading-relaxed text-slate-800 flex-1 overflow-y-auto max-h-[440px] shadow-inner select-text">
            {renderHighlightedContent(activeDoc.fullContent)}
          </div>

          {/* Document Summary Footer */}
          <div className="pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono text-[11px]">
              Extracted Facts: <strong>{activeDoc.extractedFacts.length} anchors</strong>
            </span>
            <span className="text-[11px] text-slate-400">
              Interactive highlights synchronized with right inspector
            </span>
          </div>

        </div>

        {/* COLUMN 3: AI Annotations Column (Right) as specified in prompt */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              AI Annotations
            </span>
            <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded">
              High Confidence
            </span>
          </div>

          {/* List of AI Annotation Cards visually connected to highlights */}
          <div className="space-y-3">
            {activeDoc.extractedFacts.map((fact, idx) => {
              const isSelected = idx === selectedFactIndex;
              const isSuspicious = fact.flag === 'suspicious' || fact.flag === 'mismatch';

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedFactIndex(idx)}
                  className={`bg-[#FDFCFA] border rounded-xl p-3.5 cursor-pointer transition-all shadow-2xs hover:shadow-paper ${
                    isSelected
                      ? 'border-indigo-600 bg-white ring-2 ring-indigo-500/10'
                      : 'border-[#ECEAE4]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                      {fact.label}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-[#F0FDF4] px-1.5 py-0.2 rounded border border-[#BBF7D0]">
                      {Math.round(fact.confidence * 100)}% Conf.
                    </span>
                  </div>

                  <p className={`text-xs font-mono font-bold ${
                    isSuspicious ? 'text-rose-700' : 'text-slate-900'
                  }`}>
                    {fact.value}
                  </p>

                  <div className="mt-2 pt-2 border-t border-[#F2EFE9] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Status</span>
                    {isSuspicious ? (
                      <span className="text-rose-700 font-bold flex items-center gap-0.5">
                        <AlertTriangle className="w-2.5 h-2.5" /> Flagged Discrepancy
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Chronology Verified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* If there's an RFI action associated with this doc, offer quick trigger */}
            {onRequestEvidence && (
              <div className="bg-[#FAF9F5] border border-[#E2E0D8] rounded-xl p-3.5 space-y-2 mt-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block">
                  Investigator Action
                </span>
                <p className="text-[11px] text-slate-600">
                  Notice an inconsistency in this document? Transmit a Request for Information (RFI).
                </p>
                <button
                  onClick={onRequestEvidence}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Transmit RFI for this Document</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
