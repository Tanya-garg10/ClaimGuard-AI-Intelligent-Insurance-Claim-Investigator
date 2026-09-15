import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  RefreshCw,
  MailCheck
} from 'lucide-react';
import { MissingEvidenceItem, ClaimCase } from '../types';

interface RfiModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingItem: MissingEvidenceItem | null;
  claimCase: ClaimCase;
}

export const RfiModal: React.FC<RfiModalProps> = ({
  isOpen,
  onClose,
  missingItem,
  claimCase,
}) => {
  const [letterText, setLetterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen || !missingItem) return;

    const generateLetter = async () => {
      setLoading(true);
      setSent(false);
      try {
        const response = await fetch('/api/generate-rfi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentCase: claimCase, missingItem }),
        });
        const data = await response.json();
        if (data && data.letter) {
          setLetterText(data.letter);
        } else {
          throw new Error(data?.error || 'Letter generation unavailable');
        }
      } catch (err) {
        setLetterText(`CLAIMGUARD AI INVESTIGATION AUDIT DIVISION\nFORMAL REQUEST FOR EVIDENCE (RFI NOTICE)\n\nDate: ${new Date().toLocaleDateString('en-GB')}\nTo: ${missingItem.targetParty.toUpperCase()} MEDICAL RECORDS & AUDIT DESK\nRe: Claim #${claimCase.claimNumber} (${claimCase.claimantName})\nPolicy Endorsement: ${claimCase.policyNumber}\n\nDear Sir / Madam,\n\nPlease provide certified, non-redacted copies of the following record required to complete claim investigation:\n\nRequested Record: ${missingItem.title}\nForensic Purpose: ${missingItem.reason}\n\nStatutory Notice: Failure to transmit corroborated records within 15 calendar days may result in provisional denial under Policy Adjudication Guidelines.\n\nRespectfully,\nSpecial Investigation Unit (SIU)\nClaims Adjudication Division, ClaimGuard AI`);
      } finally {
        setLoading(false);
      }
    };

    generateLetter();
  }, [isOpen, missingItem, claimCase]);

  if (!isOpen || !missingItem) return null;

  const copyText = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setSent(true);
    missingItem.requested = true;
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl w-full max-w-2xl shadow-paper-elevated overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#ECEAE4] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Formal Request for Information (RFI) Notice
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Target: {missingItem.targetParty.toUpperCase()} &bull; Claim #{claimCase.claimNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F3F1EB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#ECEAE4] flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Missing Evidentiary Record:</span>
              <span className="font-semibold text-slate-900">{missingItem.title}</span>
            </div>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">
              {missingItem.importance} priority
            </span>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
              <span>Drafting authoritative RFI notice with cross-referenced clauses...</span>
            </div>
          ) : (
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              className="w-full h-80 bg-white border border-[#DCD9D0] rounded-xl p-4 text-slate-800 font-mono text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-inner"
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#ECEAE4] bg-white flex items-center justify-between gap-3">
          <button
            onClick={copyText}
            className="px-3 py-1.5 rounded-xl bg-[#F3F1EB] hover:bg-[#EBE8E0] text-slate-700 border border-[#E3E0D8] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Notice'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-[#F3F1EB] text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={loading || sent}
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-paper disabled:opacity-50"
            >
              {sent ? <MailCheck className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5 text-indigo-300" />}
              <span>{sent ? 'Dispatched' : 'Transmit RFI to Provider'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
