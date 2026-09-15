import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  FileCode2, 
  Sparkles, 
  Calendar, 
  Building2, 
  User, 
  Receipt,
  Stethoscope,
  Copy,
  Check
} from 'lucide-react';
import { DocumentItem, DocumentType } from '../types';

interface EvidenceDossierProps {
  documents: DocumentItem[];
  selectedDocTitle?: string | null;
}

export const EvidenceDossier: React.FC<EvidenceDossierProps> = ({
  documents,
  selectedDocTitle,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(
    documents.find((d) => d.title === selectedDocTitle)?.id || documents[0]?.id || ''
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // If selectedDocTitle changed externally
  React.useEffect(() => {
    if (selectedDocTitle) {
      const match = documents.find((d) => d.title.toLowerCase().includes(selectedDocTitle.toLowerCase()));
      if (match) setActiveDocId(match.id);
    }
  }, [selectedDocTitle, documents]);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  const getDocIcon = (type: DocumentType) => {
    switch (type) {
      case 'policy':
        return <FileCode2 className="w-4 h-4 text-indigo-400" />;
      case 'medical_report':
        return <Stethoscope className="w-4 h-4 text-emerald-400" />;
      case 'hospital_bill':
      case 'receipt':
        return <Receipt className="w-4 h-4 text-amber-400" />;
      case 'claimant_statement':
        return <User className="w-4 h-4 text-violet-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const copyDocContent = () => {
    if (!activeDoc) return;
    navigator.clipboard.writeText(activeDoc.fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
      
      {/* Document Sidebar Selector */}
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-850 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Evidence Dossier</span>
          </h3>
          <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
            {documents.length} Files
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Raw submitted documents, invoices, diagnostic notes, and multimodal extractions.
        </p>

        {/* Document Items List */}
        <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
          {documents.map((doc) => {
            const isActive = doc.id === activeDocId;
            const hasSuspiciousFact = doc.extractedFacts.some(f => f.flag === 'suspicious' || f.flag === 'mismatch');

            return (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                  isActive
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-200 ring-1 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                }`}
              >
                <div className="p-1.5 rounded-md bg-slate-800 shrink-0 mt-0.5">
                  {getDocIcon(doc.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      {doc.type.replace('_', ' ')}
                    </span>
                    {hasSuspiciousFact && (
                      <span className="w-2 h-2 rounded-full bg-rose-500" title="Contains flagged discrepancy" />
                    )}
                  </div>
                  <p className="font-semibold text-slate-100 truncate mt-0.5">{doc.title}</p>
                  <p className="text-[10px] text-slate-400 truncate">{doc.authorOrProvider}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Document Content Viewport & AI Fact Inspector */}
      <div className="lg:col-span-8 p-5 flex flex-col justify-between space-y-4">
        {activeDoc ? (
          <>
            {/* Document Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-100">{activeDoc.title}</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {activeDoc.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {activeDoc.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" /> {activeDoc.authorOrProvider}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyDocContent}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
            </div>

            {/* AI Extracted Entities / Fact Chips */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-semibold text-slate-200">AI Extracted Entities &amp; Flags:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDoc.extractedFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 ${
                      fact.flag === 'suspicious' || fact.flag === 'mismatch'
                        ? 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                        : 'bg-slate-850 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        {fact.label}
                      </span>
                      <span className="font-semibold text-slate-100">{fact.value}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {Math.round(fact.confidence * 100)}% conf
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Full Text with Preformatted Inspector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Document Text &amp; Transcript:</span>
                <div className="relative w-48">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search in document..."
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[11px] rounded px-2 py-0.5 pl-6 focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="w-3 h-3 text-slate-500 absolute left-1.5 top-1.5" />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {activeDoc.fullContent}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            Select a document from the left to view evidence text and extracted entities.
          </div>
        )}
      </div>

    </div>
  );
};
