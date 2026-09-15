export type ClaimType = 'health' | 'auto' | 'property' | 'workers_comp';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DocumentType = 
  | 'policy' 
  | 'medical_report' 
  | 'hospital_bill' 
  | 'receipt' 
  | 'claimant_statement' 
  | 'incident_report'
  | 'image_evidence';

export interface DocumentItem {
  id: string;
  title: string;
  type: DocumentType;
  date: string;
  authorOrProvider: string;
  summary: string;
  fullContent: string;
  extractedFacts: Array<{
    label: string;
    value: string;
    confidence: number;
    flag?: 'ok' | 'mismatch' | 'suspicious';
  }>;
}

export interface VerificationItem {
  id: string;
  category: 'dates' | 'amounts' | 'identities' | 'treatments' | 'policy_conditions';
  title: string;
  status: 'matched' | 'mismatch' | 'unverified' | 'flagged';
  expectedValue: string;
  actualValues: Array<{
    documentTitle: string;
    value: string;
  }>;
  explanation: string;
  investigatorChecked?: boolean;
}

export interface ExplainableFinding {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info' | 'verified';
  category: string;
  whatHappened: string;
  supportingEvidence: Array<{
    documentTitle: string;
    excerpt: string;
    reference: string;
  }>;
  whyItMatters: string;
  whatShouldHappenNext: string;
  status: 'open' | 'investigated' | 'resolved';
}

export interface MissingEvidenceItem {
  id: string;
  title: string;
  importance: 'critical' | 'moderate' | 'optional';
  reason: string;
  targetParty: 'claimant' | 'hospital' | 'police' | 'employer';
  requested?: boolean;
}

export interface CoverageAssessment {
  isCovered: boolean | 'partial';
  statusText: string;
  policyNumber: string;
  clausesApplied: Array<{
    clauseId: string;
    description: string;
    impact: 'covered' | 'excluded' | 'capped';
    amountImpact?: number;
  }>;
  claimedAmount: number;
  allowedAmount: number;
  deductible: number;
  unauthorizedAmount: number;
  notes: string;
}

export interface EvidenceGraphNode {
  id: string;
  label: string;
  type: 'claim' | 'policy' | 'medical' | 'bill' | 'receipt' | 'statement' | 'finding';
  status: 'ok' | 'warning' | 'conflict' | 'neutral';
  details?: string;
  x?: number;
  y?: number;
}

export interface EvidenceGraphLink {
  id: string;
  source: string;
  target: string;
  label: string;
  status: 'verified' | 'conflict' | 'pending';
}

export interface EvidenceGraphData {
  nodes: EvidenceGraphNode[];
  links: EvidenceGraphLink[];
}

export interface InvestigationReport {
  summary: string;
  riskScore: number;
  riskLevel: RiskLevel;
  coverage: CoverageAssessment;
  verifications: VerificationItem[];
  findings: ExplainableFinding[];
  missingEvidence: MissingEvidenceItem[];
  recommendedAction: 'VERIFY' | 'REQUEST_EVIDENCE' | 'CONTINUE_REVIEW' | 'ESCALATE_SIU' | 'APPROVE' | 'DENY';
  evidenceGraph: EvidenceGraphData;
  investigatorNotes?: string;
}

export interface ClaimCase {
  id: string;
  claimNumber: string;
  policyNumber: string;
  claimantName: string;
  claimantDob?: string;
  dateOfIncident: string;
  filingDate: string;
  claimType: ClaimType;
  title: string;
  description: string;
  claimedAmount: number;
  currencySymbol?: string;
  displayAmount?: string;
  documents: DocumentItem[];
  report: InvestigationReport;
}
