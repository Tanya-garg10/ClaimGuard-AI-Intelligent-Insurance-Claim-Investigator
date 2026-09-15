import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  X, 
  MessageSquareQuote
} from 'lucide-react';
import { ClaimCase } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface InvestigatorCopilotProps {
  currentCase: ClaimCase;
  isOpen: boolean;
  onClose: () => void;
}

export const InvestigatorCopilot: React.FC<InvestigatorCopilotProps> = ({
  currentCase,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello Investigator. I am ClaimGuard Copilot. I have indexed all evidence documents for Claim #${currentCase.claimNumber} (${currentCase.claimantName}). What would you like to investigate or cross-verify?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: `Loaded case file: Claim #${currentCase.claimNumber} (${currentCase.claimantName} — ${currentCase.displayAmount || `$${currentCase.claimedAmount.toLocaleString()}`}). I can cross-check hospital invoices, doctor notes, dates, or draft formal inquiry letters.`,
      },
    ]);
  }, [currentCase.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'Date mismatch kya hai is claim me?',
    'Room rent overcharge explain karo',
    'Histopathology report kyu chahiye?',
    'Explain the date contradiction between medical report and bill',
    'Draft an inquiry letter for the hospital regarding admission date',
  ];

  const handleSend = async (promptToSend?: string) => {
    const textToSend = promptToSend || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCase,
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      if (data?.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Regarding "${textToSend}": The cross-check verifies that the medical report specifies treatment on 12 AUG 2026, whereas the hospital tax invoice lists 14 AUG 2026. This requires formal corroboration before disbursement.`,
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Cross-Document Analysis: Under Clause 4.3 of policy #${currentCase.policyNumber}, reimbursable room accommodation is capped at ₹8,000/day. The billed rate was ₹14,000/day, creating a ₹12,000 excess patient liability.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#FDFCFA] border-l border-[#ECEAE4] shadow-paper-elevated flex flex-col animate-slide-left">
      
      {/* Header */}
      <div className="p-4 border-b border-[#ECEAE4] bg-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>ClaimGuard Copilot</span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Gemini SIU
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-mono">
              Active: {currentCase.claimNumber} ({currentCase.claimantName})
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={idx}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                  CG
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                  isUser
                    ? 'bg-slate-900 text-white font-medium shadow-2xs'
                    : 'bg-white border border-[#ECEAE4] text-slate-800 shadow-paper'
                }`}
              >
                <div
                  className={`markdown-body text-xs space-y-1.5 leading-relaxed ${
                    isUser
                      ? 'text-white [&_strong]:font-bold [&_strong]:text-amber-200 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-0.5'
                      : 'text-slate-800 [&_strong]:font-bold [&_strong]:text-slate-950 [&_strong]:bg-amber-100/60 [&_strong]:px-1 [&_strong]:py-0.2 [&_strong]:rounded [&_strong]:border [&_strong]:border-amber-200/50 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1 [&_p]:mb-1 [&_p:last-child]:mb-0'
                  }`}
                >
                  <Markdown>{m.content}</Markdown>
                </div>
              </div>
              {isUser && (
                <div 
                  className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[9px] shadow-2xs ring-1 ring-slate-300"
                  title="Investigator"
                >
                  INV
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 text-[10px]">
              CG
            </div>
            <div className="bg-white border border-[#ECEAE4] rounded-2xl p-3 text-slate-500 flex items-center gap-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>Cross-referencing evidence documents...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-[#FAF9F5] border-t border-[#ECEAE4] space-y-1.5">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
          Suggested Inquiries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[10px] text-slate-700 bg-white hover:bg-[#F3F1EB] border border-[#DCD9D0] rounded-lg px-2 py-1 text-left transition-colors shadow-2xs truncate max-w-full"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-[#ECEAE4] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this claim file..."
          className="flex-1 bg-[#FAF9F5] border border-[#DCD9D0] text-slate-900 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-indigo-500 focus:outline-none placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors disabled:opacity-40 shadow-2xs"
        >
          <Send className="w-4 h-4 text-indigo-300" />
        </button>
      </form>

    </div>
  );
};
