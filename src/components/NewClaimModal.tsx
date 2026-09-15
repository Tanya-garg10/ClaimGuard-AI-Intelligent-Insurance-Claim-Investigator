import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  FileText, 
  Receipt, 
  Stethoscope, 
  UploadCloud
} from 'lucide-react';
import { ClaimCase, DocumentItem, DocumentType } from '../types';

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClaim: (newClaim: ClaimCase) => void;
}

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  isOpen,
  onClose,
  onCreateClaim,
}) => {
  const [claimNumber, setClaimNumber] = useState(`CLM-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  const [policyNumber, setPolicyNumber] = useState('POL-METRO-88210');
  const [claimantName, setClaimantName] = useState('Rohit Verma');
  const [dateOfIncident, setDateOfIncident] = useState('2026-08-10');
  const [claimedAmount, setClaimedAmount] = useState(320000);
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [title, setTitle] = useState('Inpatient Cholecystectomy & Disputed Anesthesia Surcharges');
  const [description, setDescription] = useState('Claimant underwent emergency laparoscopic gallbladder excision. Hospital invoice includes disputed off-panel robotic assist fee.');
  
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'custom-doc-1',
      title: 'Metro Health Policy Schedule #POL-METRO-88210',
      type: 'policy',
      date: '2026-01-01',
      authorOrProvider: 'Metro Mutual Health Insurers',
      summary: 'Standard surgical policy with 10% co-pay and ₹20,000 robotic surgery cap.',
      fullContent: `METRO HEALTH INSURANCE CONTRACT\nPolicy: POL-METRO-88210\nClause 3.1: Surgical excision reimbursable at 90% after deductible.\nClause 6.4: Robotic surgical assistance reimbursable up to maximum ₹20,000 ceiling.`,
      extractedFacts: [
        { label: 'Deductible', value: '₹10,000.00', confidence: 1.0, flag: 'ok' },
        { label: 'Robotic Surgery Cap', value: '₹20,000 Maximum (Clause 6.4)', confidence: 0.98, flag: 'mismatch' }
      ]
    },
    {
      id: 'custom-doc-2',
      title: 'City Specialty Hospital — Discharge Summary',
      type: 'medical_report',
      date: '2026-08-11',
      authorOrProvider: 'Dr. Anita Joshi, MS',
      summary: 'Cholecystectomy discharge note. Surgery August 11.',
      fullContent: `CITY SPECIALTY HOSPITAL\nPatient: Rohit Verma | DOB: 1988-05-12\nDate of Surgery: 11 AUG 2026\nProcedure: Laparoscopic Cholecystectomy with Robotic Arm assist.\nDischarged: 13 AUG 2026 in stable condition.`,
      extractedFacts: [
        { label: 'Surgery Date', value: '11 AUG 2026', confidence: 0.99, flag: 'ok' },
        { label: 'Discharge Date', value: '13 AUG 2026', confidence: 0.99, flag: 'ok' }
      ]
    },
    {
      id: 'custom-doc-3',
      title: 'City Specialty Hospital — Tax Invoice',
      type: 'hospital_bill',
      date: '2026-08-13',
      authorOrProvider: 'City Hospital Billing',
      summary: 'Hospital invoice billing ₹3,20,000 with admission date recorded as 12 AUG.',
      fullContent: `CITY SPECIALTY HOSPITAL — TAX INVOICE\nTotal: ₹3,20,000.00\nAdmission: 12 AUG 2026 (Mismatch with Operative date 11 AUG)\nRobotic Surcharge: ₹65,000.00 (Exceeds Policy cap ₹20,000)`,
      extractedFacts: [
        { label: 'Admission Recorded', value: '12 AUG 2026', confidence: 0.98, flag: 'mismatch' },
        { label: 'Robotic Surcharge', value: '₹65,000.00 (Exceeds cap)', confidence: 0.99, flag: 'mismatch' }
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newClaim: ClaimCase = {
      id: `case-${Date.now()}`,
      claimNumber,
      policyNumber,
      claimantName,
      dateOfIncident,
      filingDate: new Date().toISOString().split('T')[0],
      claimType: 'health',
      title,
      description,
      claimedAmount: Number(claimedAmount),
      currencySymbol,
      displayAmount: `${currencySymbol}${Number(claimedAmount).toLocaleString()}`,
      documents,
      report: {
        summary: `Initial automated review for Claim #${claimNumber} flagged discrepancy between treatment date in medical records and hospital billing, plus potential equipment cap violation.`,
        riskScore: 52,
        riskLevel: 'MEDIUM',
        coverage: {
          isCovered: 'partial',
          statusText: 'Likely Eligible — Audit Required for Discrepancies',
          policyNumber,
          clausesApplied: [
            { clauseId: 'Clause 3.1', description: 'Surgical excision standard cover', impact: 'covered', amountImpact: 10000 },
            { clauseId: 'Clause 6.4', description: 'Robotic assistance equipment cap', impact: 'capped', amountImpact: 45000 }
          ],
          claimedAmount: Number(claimedAmount),
          allowedAmount: Number(claimedAmount) - 55000,
          deductible: 10000,
          unauthorizedAmount: 45000,
          notes: 'Excess surcharge liability adjusted.'
        },
        verifications: [
          {
            id: 'v-new-1',
            category: 'dates',
            title: 'Procedure Date Alignment',
            status: 'mismatch',
            expectedValue: '11 AUG 2026',
            actualValues: [
              { documentTitle: 'Medical Report', value: '11 AUG 2026' },
              { documentTitle: 'Tax Invoice', value: '12 AUG 2026' }
            ],
            explanation: 'Discharge summary states surgery occurred Aug 11, bill records admission Aug 12.'
          },
          {
            id: 'v-new-2',
            category: 'amounts',
            title: 'Robotic Equipment Surcharge Cap',
            status: 'flagged',
            expectedValue: '₹20,000.00 Limit',
            actualValues: [
              { documentTitle: 'Policy Clause 6.4', value: '₹20,000.00' },
              { documentTitle: 'Hospital Bill', value: '₹65,000.00' }
            ],
            explanation: 'Billed charge exceeds maximum allowable policy threshold.'
          }
        ],
        findings: [
          {
            id: 'f-new-1',
            title: 'Treatment date mismatch',
            severity: 'warning',
            category: 'Chronology',
            whatHappened: 'Medical report lists procedure on 11 AUG 2026, hospital invoice lists admission as 12 AUG 2026.',
            supportingEvidence: [
              { documentTitle: 'Medical Report', excerpt: 'Date of Surgery: 11 AUG 2026', reference: 'Line 2' },
              { documentTitle: 'Hospital Invoice', excerpt: 'Admission: 12 AUG 2026', reference: 'Header' }
            ],
            whyItMatters: 'Chronological inconsistency requires provider verification.',
            whatShouldHappenNext: 'Transmit formal RFI for admission sheet.',
            status: 'open'
          }
        ],
        missingEvidence: [
          {
            id: 'm-new-1',
            title: 'Anesthesia Log & Operating Room Registry',
            importance: 'critical',
            reason: 'To corroborate exact surgical timestamps.',
            targetParty: 'hospital'
          }
        ],
        recommendedAction: 'REQUEST_EVIDENCE',
        evidenceGraph: {
          nodes: [
            { id: 'c-root', label: `Claim #${claimNumber}`, type: 'claim', status: 'neutral' },
            { id: 'c-pol', label: documents[0].title, type: 'policy', status: 'ok' },
            { id: 'c-med', label: documents[1].title, type: 'medical', status: 'ok' },
            { id: 'c-bill', label: documents[2].title, type: 'bill', status: 'conflict' }
          ],
          links: [
            { id: 'l-1', source: 'c-root', target: 'c-pol', label: 'governed by', status: 'verified' },
            { id: 'l-2', source: 'c-root', target: 'c-med', label: 'supported by', status: 'verified' },
            { id: 'l-3', source: 'c-root', target: 'c-bill', label: 'billed by', status: 'conflict' },
            { id: 'l-4', source: 'c-med', target: 'c-bill', label: 'date contradiction', status: 'conflict' }
          ]
        }
      }
    };

    onCreateClaim(newClaim);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FDFCFA] border border-[#ECEAE4] rounded-2xl w-full max-w-2xl shadow-paper-elevated overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#ECEAE4] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Register New Insurance Claim File
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Multimodal Evidence Ingestion &amp; Automated Cross-Verification
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
                Claim Number
              </label>
              <input
                type="text"
                required
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
                className="w-full bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
                Policy Number
              </label>
              <input
                type="text"
                required
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                className="w-full bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
                Claimant Full Name
              </label>
              <input
                type="text"
                required
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                className="w-full bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
                Claimed Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="w-12 bg-white border border-[#DCD9D0] rounded-xl px-2 py-2 text-slate-900 font-mono text-center font-bold"
                />
                <input
                  type="number"
                  required
                  value={claimedAmount}
                  onChange={(e) => setClaimedAmount(Number(e.target.value))}
                  className="flex-1 bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
              Claim Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-mono text-[10px] uppercase mb-1">
              Investigation Narrative &amp; Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#DCD9D0] rounded-xl px-3 py-2 text-slate-900 leading-relaxed"
            />
          </div>

          {/* Evidence Files Preloaded */}
          <div className="pt-2 border-t border-[#ECEAE4]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block mb-2">
              Attached Evidentiary Documents ({documents.length} files included)
            </span>
            <div className="space-y-2">
              {documents.map((d) => (
                <div key={d.id} className="p-2.5 bg-white border border-[#ECEAE4] rounded-xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="font-semibold text-slate-800">{d.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{d.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#ECEAE4] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-[#F3F1EB] text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 shadow-paper"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Ingest &amp; Launch Investigation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
