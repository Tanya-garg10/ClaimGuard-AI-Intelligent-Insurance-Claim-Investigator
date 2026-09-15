import { ClaimCase } from '../types';

export const INITIAL_CLAIMS: ClaimCase[] = [
  {
    id: 'case-aarav',
    claimNumber: 'CLM-20481',
    policyNumber: 'POL-STAR-44918',
    claimantName: 'Aarav Sharma',
    claimantDob: '1991-03-14',
    dateOfIncident: '2026-08-11',
    filingDate: '2026-08-16',
    claimType: 'health',
    title: 'Emergency Laparoscopic Appendectomy & Inpatient Hospitalization',
    description: 'Claimant submitted emergency hospitalization claim for acute appendicitis surgery, post-operative pharmacy charges, and diagnostic care at Apollo Specialty Hospitals.',
    claimedAmount: 485000,
    currencySymbol: '₹',
    displayAmount: '₹4,85,000',
    documents: [
      {
        id: 'aarav-doc-1',
        title: 'Star Comprehensive Health Policy #POL-STAR-44918',
        type: 'policy',
        date: '2025-01-01',
        authorOrProvider: 'Star Health & Allied Insurance',
        summary: 'Gold tier individual health insurance. Clause 2.1 covers emergency surgical admissions at 100% after ₹15,000 deductible. Clause 4.3 caps room rent at ₹8,000/day.',
        fullContent: `STAR COMPREHENSIVE HEALTH PLAN — SCHEDULE OF BENEFITS
Policyholder: Aarav Sharma | Policy Number: POL-STAR-44918 | Inception: 01-Jan-2025
Sum Insured: ₹10,00,000 | Status: Active

SECTION 2.1 — EMERGENCY SURGICAL ADMISSIONS:
Emergency hospitalizations for acute abdominal conditions, including appendectomy, are covered under Tier-1 network guidelines at 100% of approved tariffs after applying a single-event deductible of ₹15,000.

SECTION 4.3 — ROOM RENT AND NURSING ALLOWANCE:
Hospital accommodation charges are reimbursable up to a maximum daily ceiling of ₹8,000.00 per 24-hour cycle. Any surcharge, room upgrade, or deluxe suite difference is payable exclusively by the insured claimant.

SECTION 6.2 — MANDATORY DIAGNOSTIC CORROBORATION:
All surgical excision claims must be accompanied by certified Histopathology / Biopsy laboratory reports confirming the surgical excised specimen.`,
        extractedFacts: [
          { label: 'Policy Status', value: 'Active (Tier-1 Network)', confidence: 1.0, flag: 'ok' },
          { label: 'Room Rent Cap', value: '₹8,000 / day (Clause 4.3)', confidence: 0.99, flag: 'mismatch' },
          { label: 'Deductible', value: '₹15,000.00 (Clause 2.1)', confidence: 1.0, flag: 'ok' },
          { label: 'Mandatory Pathology', value: 'Biopsy confirmation required (Clause 6.2)', confidence: 0.98, flag: 'suspicious' }
        ]
      },
      {
        id: 'aarav-doc-2',
        title: 'Apollo Specialty Hospitals — Discharge Summary',
        type: 'medical_report',
        date: '2026-08-12',
        authorOrProvider: 'Dr. Vivek Mehra, MS, FACS (Consultant Surgeon)',
        summary: 'Discharge summary stating emergency admission and laparoscopic appendectomy performed on 12 AUG 2026.',
        fullContent: `APOLLO SPECIALTY HOSPITALS — DEPARTMENT OF GENERAL SURGERY
Patient Name: Aarav Sharma | UHID: #AP-882910 | Age: 35 Yrs | Sex: Male
Consultant Surgeon: Dr. Vivek Mehra, MS, DNB, FACS

Clinical Summary:
Patient presented to the Emergency Department at 02:40 AM with severe acute lower right quadrant pain (RLQ), guarding, nausea, and leukocytosis (WBC 14,200). Clinical examination and ultrasound confirmed acute suppurative appendicitis.

Operative Details:
Date of Surgery: 12 AUG 2026 at 06:30 AM
Procedure: Emergency 3-Port Laparoscopic Appendectomy. Retrocecal inflamed appendix dissected, mesoappendix cauterized, base ligated with Endoloop. Specimen sent for Histopathology.
Discharge Date: 14 AUG 2026 at 11:00 AM (48-hour uneventful post-operative observation).`,
        extractedFacts: [
          { label: 'Surgery Date', value: '12 AUG 2026', confidence: 0.98, flag: 'ok' },
          { label: 'Discharge Date', value: '14 AUG 2026', confidence: 0.99, flag: 'ok' },
          { label: 'Diagnosis', value: 'Acute Suppurative Appendicitis', confidence: 1.0, flag: 'ok' },
          { label: 'Pathology Note', value: 'Specimen sent for Histopathology', confidence: 0.96, flag: 'suspicious' }
        ]
      },
      {
        id: 'aarav-doc-3',
        title: 'Apollo Specialty Hospitals — Itemized Tax Invoice',
        type: 'hospital_bill',
        date: '2026-08-14',
        authorOrProvider: 'Apollo Patient Billing Department',
        summary: 'Hospital invoice billing ₹4,85,000 with admission date recorded as 14 AUG 2026 (contradicting medical report of 12 AUG 2026).',
        fullContent: `APOLLO SPECIALTY HOSPITALS — FINAL ITEMIZED PATIENT INVOICE
Bill No: INV-APL-2026-9041 | Date: 14 AUG 2026
Patient: Aarav Sharma | Admission Recorded: 14 AUG 2026 | Discharge: 14 AUG 2026

BILLING BREAKDOWN:
1. Laparoscopic Surgical Theatre & Video Tower Package: ₹2,40,000.00
2. Surgeon & Anesthesiologist Professional Fees: ₹1,10,000.00
3. Executive Deluxe Inpatient Suite (2 Days @ ₹14,000/day): ₹28,000.00
4. Pharmacy & Post-Op Antibiotics Protocol: ₹42,000.00
5. Diagnostic Ultrasound & Emergency Triage: ₹35,000.00
6. Consumables & Laparoscopic Trocars: ₹30,000.00

TOTAL BILLED AMOUNT: ₹4,85,000.00
Payment Mode: Insurance Direct TPA Claim Submission.`,
        extractedFacts: [
          { label: 'Total Billed Amount', value: '₹4,85,000.00', confidence: 1.0, flag: 'ok' },
          { label: 'Recorded Admission Date', value: '14 AUG 2026', confidence: 0.99, flag: 'mismatch' },
          { label: 'Room Charge Billed', value: '₹14,000.00 / day (Policy cap: ₹8,000)', confidence: 0.97, flag: 'mismatch' }
        ]
      },
      {
        id: 'aarav-doc-4',
        title: 'Apollo Pharmacy — Post-Operative Dispensation Receipt',
        type: 'receipt',
        date: '2026-08-13',
        authorOrProvider: 'Apollo Pharmacy Services',
        summary: 'Receipt for IV Ceftriaxone, analgesics, and dressing kits dated 13 AUG 2026.',
        fullContent: `APOLLO PHARMACY — INPATIENT DISPENSATION
Rx No: RX-2026-551 | Date: 13 AUG 2026
Patient: Aarav Sharma | Ward: 4B Deluxe
Items Dispensed:
- Inj. Ceftriaxone 1g IV (6 vials): ₹7,800.00
- Inj. Tramadol + Paracetamol infusion: ₹3,400.00
- Sterile Dressing Packs & Surgical Mesh: ₹12,800.00
- Discharge Oral Antibiotics (Augmentin 625mg): ₹2,200.00
TOTAL PHARMACY: ₹26,200.00 (Included in Main Bill)`,
        extractedFacts: [
          { label: 'Dispensation Date', value: '13 AUG 2026', confidence: 0.98, flag: 'ok' },
          { label: 'Consistency', value: 'Aligns with mid-stay therapy', confidence: 0.96, flag: 'ok' }
        ]
      },
      {
        id: 'aarav-doc-5',
        title: 'Claimant Sworn Declaration & Incident Statement',
        type: 'claimant_statement',
        date: '2026-08-15',
        authorOrProvider: 'Aarav Sharma (Claimant)',
        summary: 'Personal account of onset of pain on August 11 night, ER arrival August 12 dawn.',
        fullContent: `CLAIMANT FORMAL WRITTEN STATEMENT
I, Aarav Sharma, hereby declare that I experienced severe acute lower abdominal cramps around 11:30 PM on August 11, 2026. After symptoms worsened through the night, my family rushed me to Apollo Hospital Emergency at approximately 2:30 AM on August 12, 2026. Dr. Vivek Mehra operated on me that morning. I was hospitalized for two days and discharged on August 14 afternoon. All charges submitted represent direct hospital expenses.
Signed: Aarav Sharma | Date: 15-Aug-2026`,
        extractedFacts: [
          { label: 'Claimant Admission Timeline', value: 'Admitted Aug 12, 02:30 AM', confidence: 0.99, flag: 'ok' },
          { label: 'Surgery Confirmation', value: 'Morning of Aug 12', confidence: 0.99, flag: 'ok' }
        ]
      }
    ],
    report: {
      summary: 'ClaimGuard cross-document investigation identified a critical date discrepancy between the medical discharge summary (surgery on 12 AUG 2026) and the hospital tax invoice (admission recorded as 14 AUG 2026). Additionally, the deluxe room charge exceeded the policy tier ceiling by ₹12,000, and the mandatory post-operative histopathology biopsy report is missing from the submitted file.',
      riskScore: 48,
      riskLevel: 'MEDIUM',
      coverage: {
        isCovered: 'partial',
        statusText: 'Likely Eligible — Audit Required for Date Discrepancy & Room Cap',
        policyNumber: 'POL-STAR-44918',
        clausesApplied: [
          { clauseId: 'Clause 2.1', description: 'Emergency surgical admission covered at 100% after deductible', impact: 'covered', amountImpact: 15000 },
          { clauseId: 'Clause 4.3', description: 'Room rent ceiling ₹8,000/day (Exceeded by ₹6,000/day for 2 days)', impact: 'capped', amountImpact: 12000 },
          { clauseId: 'Clause 6.2', description: 'Histopathology biopsy corroboration required before final sign-off', impact: 'excluded', amountImpact: 0 }
        ],
        claimedAmount: 485000,
        allowedAmount: 458000,
        deductible: 15000,
        unauthorizedAmount: 27000,
        notes: 'Room upgrade liability (₹12,000) and deductible (₹15,000) adjusted. Final payment conditioned on pathology confirmation.'
      },
      verifications: [
        {
          id: 'v-aarav-1',
          category: 'dates',
          title: 'Treatment Date & Admission Discrepancy',
          status: 'mismatch',
          expectedValue: '12 AUG 2026 (Emergency Admission & Surgery)',
          actualValues: [
            { documentTitle: 'Medical Report (Dr. Mehra)', value: '12 AUG 2026' },
            { documentTitle: 'Hospital Invoice (Apollo)', value: '14 AUG 2026' }
          ],
          explanation: 'The submitted **Hospital Final Bill** lists admission on **14 AUG 2026**, which contradicts the **Medical Report / Discharge Summary** stating surgery occurred on **12 AUG 2026** — creating a direct **48-hour contradiction**.',
          investigatorChecked: false
        },
        {
          id: 'v-aarav-2',
          category: 'amounts',
          title: 'Daily Room Rent Tariff vs Policy Ceiling',
          status: 'flagged',
          expectedValue: '₹8,000.00 / day Maximum (Clause 4.3)',
          actualValues: [
            { documentTitle: 'Policy Contract', value: '₹8,000 / day Limit' },
            { documentTitle: 'Hospital Invoice', value: '₹14,000 / day Billed (Deluxe Suite)' }
          ],
          explanation: 'Patient stayed in Deluxe Inpatient Suite billed at ₹14,000/day. Policy Clause 4.3 caps reimbursable room rent at ₹8,000/day, creating an unallowable ₹12,000 differential.',
          investigatorChecked: true
        },
        {
          id: 'v-aarav-3',
          category: 'identities',
          title: 'Insured Patient Identity Verification',
          status: 'matched',
          expectedValue: 'Aarav Sharma | DOB 1991-03-14',
          actualValues: [
            { documentTitle: 'Star Health Policy', value: 'Aarav Sharma | DOB 1991-03-14' },
            { documentTitle: 'Hospital Discharge Summary', value: 'Aarav Sharma | Age 35 | UHID #AP-882910' }
          ],
          explanation: 'Claimant identity verified with 100% confidence across hospital record and policy endorsement.',
          investigatorChecked: true
        },
        {
          id: 'v-aarav-4',
          category: 'policy_conditions',
          title: 'Emergency Admission Pre-Authorization Waiver',
          status: 'matched',
          expectedValue: 'Emergency Waiver Approved within 24 Hours',
          actualValues: [
            { documentTitle: 'Policy Terms', value: 'Emergency waiver valid if reported <24 hrs' },
            { documentTitle: 'Hospital Summary', value: 'Triage documented acute suppurative onset' }
          ],
          explanation: 'Emergency admission meets Clause 2.1 acute threshold.',
          investigatorChecked: true
        }
      ],
      findings: [
        {
          id: 'f-aarav-1',
          title: 'Critical Date Contradiction: Surgery Date Precedes Admission',
          severity: 'critical',
          category: 'Chronology & Billing',
          whatHappened: 'The **Medical Report / Discharge Summary** के अनुसार, सर्जरी (laparoscopic appendectomy) **12 AUG 2026** को हुई थी, जबकि **Hospital Final Bill** में एडमिशन **14 AUG 2026** को रजिस्टर हुआ दिखा रहा है। यह सीधा **48 घंटे का अंतर** है जहाँ सर्जरी एडमिशन से पहले हुई दिख रही है।',
          supportingEvidence: [
            { documentTitle: 'Medical Report', excerpt: 'Date of Surgery: 12 AUG 2026 at 06:30 AM', reference: 'Section 2' },
            { documentTitle: 'Hospital Invoice', excerpt: 'Admission Recorded: 14 AUG 2026 | Date: 14 AUG 2026', reference: 'Header' }
          ],
          whyItMatters: 'यह एक **गंभीर विसंगति** है: **48 घंटे का अंतर** यह दर्शाता है कि या तो मेडिकल रिकॉर्ड्स बैकडेटेड हैं, या फिर गैर-अस्पताल सर्जरी को इनपेशेंट पैकेज में बिल किया गया है। क्लेम डिस्बर्सल से पहले सत्यापन आवश्यक है।',
          whatShouldHappenNext: '**REQUEST EVIDENCE** → हॉस्पिटल प्रशासन से प्रमाणित **Operation Theatre (OT) Entry Register** और ड्यूटी डॉक्टर साइन-इन शीट तुरंत तलब करें।',
          status: 'open'
        },
        {
          id: 'f-aarav-2',
          title: 'Deluxe room rent rate exceeded policy cap',
          severity: 'info',
          category: 'Policy Adjudication',
          whatHappened: 'Apollo billed ₹14,000/day for 2 nights in an Executive Deluxe room, exceeding the policy limit of ₹8,000/day.',
          supportingEvidence: [
            { documentTitle: 'Policy Clause 4.3', excerpt: 'Hospital accommodation charges reimbursable up to daily ceiling of ₹8,000.00', reference: 'Section 4.3' },
            { documentTitle: 'Hospital Invoice', excerpt: 'Executive Deluxe Inpatient Suite (2 Days @ ₹14,000/day): ₹28,000.00', reference: 'Line 3' }
          ],
          whyItMatters: '₹12,000 in excess room rent must be deducted from the authorized settlement amount.',
          whatShouldHappenNext: 'Apply automatic Clause 4.3 adjustment of ₹12,000 to claimant liability.',
          status: 'open'
        },
        {
          id: 'f-aarav-3',
          title: 'Missing pathology diagnostic histology report',
          severity: 'warning',
          category: 'Evidence Completeness',
          whatHappened: 'Operative note indicates excised appendix specimen was sent for histopathology, but the diagnostic lab report was omitted from the filing.',
          supportingEvidence: [
            { documentTitle: 'Medical Report', excerpt: 'Specimen sent for Histopathology.', reference: 'Operative Details' },
            { documentTitle: 'Policy Clause 6.2', excerpt: 'All surgical claims must be accompanied by certified Histopathology laboratory reports.', reference: 'Section 6.2' }
          ],
          whyItMatters: 'Policy Clause 6.2 mandates certified histology corroboration before final claim disbursement.',
          whatShouldHappenNext: 'REQUEST EVIDENCE → Request certified biopsy histology report from Apollo Laboratories.',
          status: 'open'
        }
      ],
      missingEvidence: [
        {
          id: 'm-aarav-1',
          title: 'Histopathology Biopsy Corroboration Report',
          importance: 'critical',
          reason: 'Required under Policy Clause 6.2 to confirm acute gangrenous or suppurative appendicitis.',
          targetParty: 'hospital',
          requested: false
        },
        {
          id: 'm-aarav-2',
          title: 'Hospital Admission Log Correction Letter',
          importance: 'moderate',
          reason: 'Required to clarify whether admission was Aug 12 or Aug 14.',
          targetParty: 'hospital',
          requested: false
        }
      ],
      recommendedAction: 'REQUEST_EVIDENCE',
      evidenceGraph: {
        nodes: [
          { id: 'c-root', label: 'Claim #CLM-20481 (₹4,85,000)', type: 'claim', status: 'neutral' },
          { id: 'c-pol', label: 'Star Health Policy POL-STAR-44918', type: 'policy', status: 'ok' },
          { id: 'c-med', label: 'Apollo Medical Report (12 AUG 2026)', type: 'medical', status: 'ok' },
          { id: 'c-bill', label: 'Apollo Hospital Invoice (14 AUG 2026)', type: 'bill', status: 'conflict' },
          { id: 'c-rx', label: 'Apollo Pharmacy Receipt (13 AUG)', type: 'receipt', status: 'ok' },
          { id: 'c-stmt', label: 'Claimant Statement (Aarav Sharma)', type: 'statement', status: 'ok' },
          { id: 'c-find1', label: 'Date Mismatch (12 vs 14 AUG)', type: 'finding', status: 'conflict' },
          { id: 'c-find2', label: 'Room Rent Cap Exceeded (+₹12,000)', type: 'finding', status: 'warning' },
          { id: 'c-find3', label: 'Missing Histopathology Biopsy', type: 'finding', status: 'warning' }
        ],
        links: [
          { id: 'l-1', source: 'c-root', target: 'c-pol', label: 'governed by', status: 'verified' },
          { id: 'l-2', source: 'c-root', target: 'c-med', label: 'clinically supported by', status: 'verified' },
          { id: 'l-3', source: 'c-root', target: 'c-bill', label: 'financial reimbursement for', status: 'pending' },
          { id: 'l-4', source: 'c-root', target: 'c-rx', label: 'medication billed by', status: 'verified' },
          { id: 'l-5', source: 'c-root', target: 'c-stmt', label: 'testified by', status: 'verified' },
          { id: 'l-6', source: 'c-bill', target: 'c-med', label: 'date contradiction (12 vs 14 Aug)', status: 'conflict' },
          { id: 'l-7', source: 'c-bill', target: 'c-find1', label: 'triggers discrepancy', status: 'conflict' },
          { id: 'l-8', source: 'c-bill', target: 'c-pol', label: 'exceeds Clause 4.3 cap', status: 'conflict' },
          { id: 'l-9', source: 'c-med', target: 'c-find3', label: 'specimen unreturned', status: 'pending' }
        ]
      }
    }
  },
  {
    id: 'case-1',
    claimNumber: 'CLM-2024-88412',
    policyNumber: 'POL-992144-GOLD',
    claimantName: 'Marcus Vance',
    claimantDob: '1976-04-12',
    dateOfIncident: '2024-08-02',
    filingDate: '2024-08-20',
    claimType: 'health',
    title: 'Inpatient Total Knee Arthroplasty following Supermarket Incident',
    description: 'Claimant filed for $42,650 covering inpatient right knee replacement surgery, robotic navigation, and post-op physical rehabilitation following an alleged slip-and-fall on August 2, 2024.',
    claimedAmount: 42650,
    currencySymbol: '$',
    displayAmount: '$42,650',
    documents: [
      {
        id: 'doc-1',
        title: 'SecureShield Gold Policy Endorsement #POL-992144',
        type: 'policy',
        date: '2024-01-01',
        authorOrProvider: 'SecureShield Underwriting Group',
        summary: 'Comprehensive healthcare coverage. Outlines exclusion moratoriums, deductible obligations, and robotic surgery equipment caps.',
        fullContent: `SECURESHIELD GOLD HEALTH PLAN — POLICY CONTRACT
Policyholder: Marcus Vance | Effective Date: 2024-01-01 | Status: Active (Month 8 of Year 1)
Section 2.4 — Inpatient Deductible:
A standard co-payment deductible of $1,500 applies to all non-emergency planned inpatient admissions.

Section 4.2 — Pre-Existing Condition Moratorium:
Any medical condition, symptom, or chronic degenerative disease for which medical advice, diagnosis, or treatment was recommended or received within the twenty-four (24) months prior to the policy effective date shall be excluded from surgical coverage during the first twelve (12) months of active coverage.

Section 7.1 — Specialized Robotic Surgical Assist:
Robotic-assisted orthopedic navigation procedures (CPT 0054T / 27447-22) are subject to a maximum reimbursement ceiling of $2,000.00. Amounts billed by providers exceeding this cap are designated non-reimbursable patient liability or provider write-off.`,
        extractedFacts: [
          { label: 'Policy Inception', value: '2024-01-01 (Month 8 Active)', confidence: 1.0, flag: 'ok' },
          { label: 'Pre-existing Exclusion', value: '12-Month Waiting Period (Clause 4.2)', confidence: 0.98, flag: 'suspicious' },
          { label: 'Robotic Surgery Cap', value: '$2,000.00 Maximum (Clause 7.1)', confidence: 0.99, flag: 'mismatch' },
          { label: 'Inpatient Deductible', value: '$1,500.00 (Clause 2.4)', confidence: 1.0, flag: 'ok' }
        ]
      },
      {
        id: 'doc-2',
        title: 'St. Jude Memorial Hospital — Discharge Summary',
        type: 'medical_report',
        date: '2024-08-17',
        authorOrProvider: 'Dr. Carolyn Chen, MD (Orthopedic Surgery)',
        summary: 'Discharge summary for Marcus Vance. Details 3-day admission (Aug 14 - Aug 17) and notes historical chronic osteoarthritis.',
        fullContent: `ST. JUDE MEMORIAL HOSPITAL — INPATIENT DISCHARGE SUMMARY
Patient Name: Marcus Vance | MRN: #SJ-904221 | DOB: 1976-04-12
Attending Surgeon: Dr. Carolyn Chen, MD, FACS | Department: Orthopedic Surgery

Admission Date & Time: August 14, 2024 at 07:15 AM
Discharge Date & Time: August 17, 2024 at 11:30 AM (Total Stay: 3 Inpatient Nights)

Operative Procedure Performed (August 14, 2024):
Right Total Knee Arthroplasty with Mako Robotic-Arm Assistance (CPT 27447).
Prosthesis: Stryker Triathlon cruciate-retaining knee system.

Pre-Operative & Post-Operative Diagnosis:
Severe Tricompartmental Osteoarthritis of Right Knee (ICD-10 M17.11), with chronic articular cartilage erosion.

Clinical History & Hospital Course:
48-year-old male with long-standing bilateral knee discomfort, significantly worse on the right side. Chart notes reflect patient had prior magnetic resonance imaging (MRI) and orthopedic consultation in June 2021 demonstrating progressive Grade IV degenerative joint disease and osteophyte proliferation. Patient tolerated surgery well. Mobilized with walker on postoperative day 1. Discharged home on August 17 in stable condition with physical therapy referral.`,
        extractedFacts: [
          { label: 'Admission Date', value: 'August 14, 2024', confidence: 0.99, flag: 'ok' },
          { label: 'Discharge Date', value: 'August 17, 2024 (3 Nights)', confidence: 0.99, flag: 'ok' },
          { label: 'Diagnosis', value: 'Chronic Grade IV Osteoarthritis (M17.11)', confidence: 0.97, flag: 'suspicious' },
          { label: 'Prior Medical History', value: 'Documented MRI & Consultation June 2021', confidence: 0.95, flag: 'suspicious' }
        ]
      },
      {
        id: 'doc-3',
        title: 'St. Jude Memorial Hospital — Itemized Inpatient Bill',
        type: 'hospital_bill',
        date: '2024-08-18',
        authorOrProvider: 'St. Jude Patient Financial Services',
        summary: 'Itemized hospital claim billing $38,200.00, including 4 nights room & board and $6,500 robotic navigation surcharge.',
        fullContent: `ST. JUDE MEMORIAL HOSPITAL — ITEMIZATION OF CHARGES
Claim Number: CLM-2024-88412 | Account: ACC-77192-MV | Billing Date: 2024-08-18
Patient: Marcus Vance | Insurer: SecureShield Gold (POL-992144)

LINE ITEMS:
1. REV 0120 — Semi-Private Room & Board (Aug 14 - Aug 18) [4 Days @ $1,800.00/day]: $7,200.00
2. REV 0360 — Operating Room Suite (3.5 Hours): $14,500.00
3. REV 0278 — Stryker Triathlon Total Knee Implant Device: $8,400.00
4. REV 0369 — Robotic Computer-Assisted Navigation Surcharge (Mako System): $6,500.00
5. REV 0370 — Anesthesia Administration (General): $3,100.00
6. REV 0250 — Inpatient Pharmacy & IV Antibiotic Protocols: $1,600.00
7. REV 0420 — In-Hospital Physical Therapy (3 sessions): $900.00

TOTAL BILLED AMOUNT: $38,200.00
Payment Terms: Due within 30 days. Remit to St. Jude Memorial Healthcare System.`,
        extractedFacts: [
          { label: 'Total Billed Amount', value: '$38,200.00', confidence: 1.0, flag: 'ok' },
          { label: 'Room & Board Billed', value: '4 Nights ($7,200.00)', confidence: 0.98, flag: 'mismatch' },
          { label: 'Robotic Navigation Charge', value: '$6,500.00 (Cap is $2,000)', confidence: 0.99, flag: 'mismatch' },
          { label: 'Billed Date Range', value: 'Aug 14 - Aug 18', confidence: 0.96, flag: 'mismatch' }
        ]
      },
      {
        id: 'doc-4',
        title: 'Apex OrthoPhysio Clinic — Rehabilitation Invoice & Notes',
        type: 'receipt',
        date: '2024-08-08',
        authorOrProvider: 'Apex OrthoPhysio Rehabilitation LLC',
        summary: 'Outpatient physical therapy bill claiming post-operative knee gait training dated August 8, 2024 (6 days prior to surgery).',
        fullContent: `APEX ORTHOPHYSIO REHABILITATION LLC
Invoice #APX-409 | Date Issued: August 08, 2024
Patient: Marcus Vance | Referring Provider: Dr. Carolyn Chen

SERVICE DETAILS:
- 2024-08-04: Initial Evaluation & Post-Operative Knee Arthroplasty Gait Protocol (CPT 97116): $450.00
- 2024-08-06: Therapeutic Exercise — Active Knee Flexion & Patellar Mobilization (CPT 97110): $450.00
- 2024-08-08: Neuromuscular Re-education & Quad Strengthening (CPT 97112): $450.00

TOTAL OUTPATIENT THERAPY BILLED: $1,350.00
Clinical Sign-off: Thomas Morales, PT, DPT`,
        extractedFacts: [
          { label: 'Invoice Date', value: 'August 08, 2024', confidence: 0.99, flag: 'suspicious' },
          { label: 'Service Description', value: 'Post-Operative Knee Gait Protocol', confidence: 0.95, flag: 'suspicious' },
          { label: 'Timeline Conflict', value: 'Services predated surgery by 6-10 days', confidence: 0.99, flag: 'suspicious' },
          { label: 'Total Amount', value: '$1,350.00', confidence: 1.0, flag: 'ok' }
        ]
      },
      {
        id: 'doc-5',
        title: 'Claimant Recorded Statement & Intake Affidavit',
        type: 'claimant_statement',
        date: '2024-08-19',
        authorOrProvider: 'Marcus Vance (Claimant sworn statement)',
        summary: 'Claimant states knees had zero prior defects and surgery was 100% caused by acute slip-and-fall on August 2, 2024.',
        fullContent: `CLAIMANT SWORN AFFIDAVIT OF INJURY
Claimant: Marcus Vance | Age: 48 | Occupation: Field Logistics Manager
Date of Statement: August 19, 2024

"I was shopping at FreshMarket Foods on August 2, 2024 around 4:30 PM in the fresh produce section. There was a puddle of water from an unmaintained misting dispenser with no warning cone. My right foot slipped out from under me and I slammed violently onto my right knee.

Prior to August 2, 2024, I had zero knee problems, zero pain, zero doctor visits, and no prior medical history whatsoever regarding my knees. The impact shattered my knee joint, and Dr. Chen informed me I needed emergency replacement surgery. The entire hospital bill of $38,200 plus my outpatient therapy of $1,350 and lost mobility expenses totaling $42,650 must be fully covered under my SecureShield policy as an acute accidental injury."`,
        extractedFacts: [
          { label: 'Reported Cause of Injury', value: 'FreshMarket slip and fall (Aug 2, 2024)', confidence: 0.98, flag: 'ok' },
          { label: 'Claimed Prior Health Status', value: '"Zero prior knee problems or doctor visits"', confidence: 0.99, flag: 'suspicious' },
          { label: 'Total Claim Asserted', value: '$42,650.00', confidence: 1.0, flag: 'ok' }
        ]
      },
      {
        id: 'doc-6',
        title: 'Historical Medical Chart Excerpt — Dr. Robert Lang (PCP)',
        type: 'medical_report',
        date: '2021-06-15',
        authorOrProvider: 'Valley Family Medicine — Dr. Robert Lang, MD',
        summary: 'Prior medical record from June 2021 diagnosing Marcus Vance with bilateral severe osteoarthritis and discussing knee arthroplasty.',
        fullContent: `VALLEY FAMILY MEDICINE & ORTHOPEDIC ASSOCIATES
Patient: Marcus Vance | Exam Date: June 15, 2021 | Physician: Dr. Robert Lang, MD

CHIEF COMPLAINT:
Progressive chronic right knee pain with swelling, stiffness, and difficulty climbing stairs for past 18 months.

DIAGNOSTIC IMAGING (Standing Bilateral Knee X-Ray & MRI Right Knee, June 12, 2021):
- Significant medial compartment joint space collapse (bone-on-bone).
- Prominent tibial and femoral osteophyte formations.
- Advanced tricompartmental degenerative osteoarthritis (Kellgren-Lawrence Grade IV).

ASSESSMENT & PLAN:
End-stage right knee osteoarthritis. Conservative measures (NSAIDs, corticosteroid intra-articular injections) have failed to provide lasting relief. Discussed surgical referral for elective Total Knee Replacement (Arthroplasty). Patient deferred immediate surgery due to work commitments.`,
        extractedFacts: [
          { label: 'Pre-existing Diagnosis Date', value: 'June 15, 2021', confidence: 0.99, flag: 'suspicious' },
          { label: 'Diagnosis Confirmed', value: 'Grade IV Degenerative Knee Osteoarthritis', confidence: 0.98, flag: 'suspicious' },
          { label: 'Recommended Procedure in 2021', value: 'Total Knee Arthroplasty', confidence: 0.96, flag: 'suspicious' }
        ]
      }
    ],
    report: {
      summary: 'Comprehensive cross-document verification identified significant evidentiary contradictions, billing overcharges, and policy exclusion triggers. The claimant asserts the $42,650 claim is solely due to an acute August 2 slip-and-fall; however, physician chart notes establish pre-existing Grade IV degenerative osteoarthritis diagnosed in 2021, subject to Policy Clause 4.2 exclusion moratorium. Furthermore, hospital billing reflects an extra unserved night of room & board ($1,800) and robotic navigation exceeding policy caps ($4,500 over cap). Physical therapy was billed prior to the actual surgery date.',
      riskScore: 88,
      riskLevel: 'HIGH',
      coverage: {
        isCovered: 'partial',
        statusText: 'Coverage Dispute — Subject to Pre-Existing Condition Moratorium & Fee Adjustments',
        policyNumber: 'POL-992144-GOLD',
        clausesApplied: [
          {
            clauseId: 'Clause 4.2',
            description: 'Pre-Existing Condition 12-Month Moratorium for chronic degenerative disease diagnosed within 24 months prior to policy',
            impact: 'excluded',
            amountImpact: 28400
          },
          {
            clauseId: 'Clause 7.1',
            description: 'Robotic Surgical Navigation Surcharge maximum reimbursement ceiling capped at $2,000.00',
            impact: 'capped',
            amountImpact: 4500
          },
          {
            clauseId: 'Clause 2.4',
            description: 'Standard Inpatient Deductible obligation',
            impact: 'covered',
            amountImpact: 1500
          }
        ],
        claimedAmount: 42650,
        allowedAmount: 8250,
        deductible: 1500,
        unauthorizedAmount: 32900,
        notes: 'If acute accidental aggravation is verified and pre-existing clause is partially waived by underwriter, maximum reimbursable baseline cannot exceed $8,250 after removing billing discrepancies ($1,800 room overcharge + $4,500 robotic excess + $1,350 inverted therapy).'
      },
      verifications: [
        {
          id: 'v-1',
          category: 'dates',
          title: 'Inpatient Stay Duration & Discharge Date',
          status: 'mismatch',
          expectedValue: '3 Inpatient Nights (Aug 14 - Aug 17)',
          actualValues: [
            { documentTitle: 'Discharge Summary (Dr. Chen)', value: 'Admitted Aug 14 at 07:15 AM, Discharged Aug 17 at 11:30 AM (3 nights)' },
            { documentTitle: 'Itemized Hospital Bill', value: 'Charged Aug 14 - Aug 18 (4 nights @ $1,800/night = $7,200)' }
          ],
          explanation: 'The hospital billed for 4 nights of room & board ($7,200), but Dr. Chen’s signed clinical discharge summary confirms patient was discharged on August 17 at 11:30 AM (3 nights = $5,400). Direct overcharge of $1,800.00.'
        },
        {
          id: 'v-2',
          category: 'dates',
          title: 'Physical Therapy Treatment Chronology',
          status: 'mismatch',
          expectedValue: 'Services rendered post-surgery (after Aug 14, 2024)',
          actualValues: [
            { documentTitle: 'Apex OrthoPhysio Invoice', value: 'Billed August 4, 6, and 8 for "Post-Operative Gait Protocol"' },
            { documentTitle: 'Discharge Summary', value: 'Surgery took place August 14, 2024' }
          ],
          explanation: 'Chronological impossibility: Apex billed for "Post-Operative Gait Protocol" on August 4-8, six to ten days before the surgery had occurred.'
        },
        {
          id: 'v-3',
          category: 'amounts',
          title: 'Robotic Navigation Technology Surcharge',
          status: 'flagged',
          expectedValue: '$2,000.00 Maximum Ceiling (Policy Clause 7.1)',
          actualValues: [
            { documentTitle: 'Itemized Hospital Bill', value: '$6,500.00 (REV 0369 Mako Robotic Navigation)' },
            { documentTitle: 'SecureShield Policy Contract', value: '$2,000.00 Max Cap (Clause 7.1)' }
          ],
          explanation: 'The hospital billed $6,500 for robotic navigation. The policy contract caps this at $2,000.00. Excess of $4,500.00 is disallowed.'
        },
        {
          id: 'v-4',
          category: 'identities',
          title: 'Claimant & Patient Identity Verification',
          status: 'matched',
          expectedValue: 'Marcus Vance, DOB: 1976-04-12, Policy POL-992144',
          actualValues: [
            { documentTitle: 'Policy Contract', value: 'Marcus Vance (DOB: 1976-04-12)' },
            { documentTitle: 'Discharge Summary', value: 'Marcus Vance, MRN #SJ-904221, DOB: 1976-04-12' },
            { documentTitle: 'Hospital Bill', value: 'Marcus Vance, Account ACC-77192-MV' }
          ],
          explanation: 'Identities, dates of birth, and member IDs match across all submitted hospital, policy, and claimant records.'
        },
        {
          id: 'v-5',
          category: 'policy_conditions',
          title: 'Pre-Existing Condition Disclosure vs. Medical Reality',
          status: 'mismatch',
          expectedValue: 'No pre-existing osteoarthritic degradation within 24 months prior to policy',
          actualValues: [
            { documentTitle: 'Claimant Affidavit', value: 'Swore "zero prior knee problems, pain, or doctor visits"' },
            { documentTitle: 'PCP Record (Dr. Lang 2021)', value: 'Diagnosed Grade IV degenerative joint disease, recommended knee replacement' },
            { documentTitle: 'Discharge Summary', value: 'Noted historical chronic osteoarthritic cartilage erosion' }
          ],
          explanation: 'Direct contradiction: Claimant sworn statement of pristine health is refuted by Dr. Lang’s 2021 diagnostic workup recommending knee replacement. Triggers Clause 4.2 exclusion.'
        }
      ],
      findings: [
        {
          id: 'f-1',
          title: 'Severe Misrepresentation of Pre-Existing Degenerative Condition',
          severity: 'critical',
          category: 'Policy Exclusion & Fraud Risk',
          whatHappened: 'The claimant executed a sworn affidavit asserting his knee was in perfect health with zero previous pain or physician consultations prior to an acute supermarket slip on August 2. However, primary care records from Dr. Robert Lang document that Marcus Vance had advanced Grade IV bone-on-bone osteoarthritis diagnosed in 2021 with surgical knee replacement already recommended.',
          supportingEvidence: [
            {
              documentTitle: 'Historical PCP Record (June 15, 2021)',
              excerpt: 'Advanced tricompartmental degenerative osteoarthritis (Kellgren-Lawrence Grade IV). Discussed surgical referral for elective Total Knee Replacement.',
              reference: 'Page 1, Assessment & Plan'
            },
            {
              documentTitle: 'Claimant Sworn Affidavit (August 19, 2024)',
              excerpt: '"Prior to August 2, 2024, I had zero knee problems, zero pain, zero doctor visits, and no prior medical history whatsoever."',
              reference: 'Paragraph 2'
            },
            {
              documentTitle: 'Hospital Discharge Summary (August 17, 2024)',
              excerpt: 'Chart notes reflect patient had prior MRI and orthopedic consultation in June 2021 demonstrating progressive Grade IV degenerative joint disease.',
              reference: 'Clinical History, Line 14'
            }
          ],
          whyItMatters: 'Triggers Policy Exclusion Clause 4.2 (12-month moratorium on pre-existing degenerative conditions). Moreover, intentional false representation on an insurance claim form constitutes statutory fraud exposure, justifying formal claim denial or referral to the Special Investigation Unit (SIU).',
          whatShouldHappenNext: '1. Issue formal Letter of Reservation of Rights to claimant citing Clause 4.2. 2. Subpoena/request full orthopedic chart history from Valley Family Medicine from 2021 to 2024. 3. Escalate file to SIU for material misrepresentation review.',
          status: 'open'
        },
        {
          id: 'f-2',
          title: 'Hospital Room & Board Overbilling (1 Non-Existent Inpatient Day)',
          severity: 'warning',
          category: 'Billing Audit',
          whatHappened: 'St. Jude Memorial Hospital charged 4 days of semi-private room & board (REV 0120) totaling $7,200 ($1,800/day). However, the physician’s discharge order and clinical notes confirm the patient was admitted August 14 at 07:15 AM and discharged August 17 at 11:30 AM, constituting 3 inpatient nights.',
          supportingEvidence: [
            {
              documentTitle: 'St. Jude Discharge Summary',
              excerpt: 'Admission Date: August 14, 2024 at 07:15 AM | Discharge Date: August 17, 2024 at 11:30 AM (Total Stay: 3 Inpatient Nights)',
              reference: 'Header Details'
            },
            {
              documentTitle: 'Itemized Inpatient Bill',
              excerpt: 'REV 0120 — Semi-Private Room & Board (Aug 14 - Aug 18) [4 Days @ $1,800.00/day]: $7,200.00',
              reference: 'Line Item 1'
            }
          ],
          whyItMatters: 'Results in an unearned duplicate/phantom room charge of $1,800.00 billed directly to the insurer.',
          whatShouldHappenNext: 'Issue an immediate billing adjustment notice to St. Jude Patient Financial Services disallowing Line Item 1 by $1,800.00.',
          status: 'open'
        },
        {
          id: 'f-3',
          title: 'Robotic Navigation Surcharge Exceeds Contractual Cap by $4,500',
          severity: 'warning',
          category: 'Contractual Compliance',
          whatHappened: 'Hospital itemized bill includes $6,500 for Mako Computer-Assisted Robotic Navigation (REV 0369). The policy contract explicitly caps robotic orthopedic assistance at $2,000.',
          supportingEvidence: [
            {
              documentTitle: 'SecureShield Policy Contract',
              excerpt: 'Section 7.1: Robotic-assisted orthopedic navigation procedures are subject to a maximum reimbursement ceiling of $2,000.00.',
              reference: 'Section 7.1'
            },
            {
              documentTitle: 'Itemized Inpatient Bill',
              excerpt: 'REV 0369 — Robotic Computer-Assisted Navigation Surcharge (Mako System): $6,500.00',
              reference: 'Line Item 4'
            }
          ],
          whyItMatters: 'Paying full billed charges would violate policy terms and result in a $4,500 unauthorized overpayment.',
          whatShouldHappenNext: 'Re-rate REV 0369 to $2,000.00 allowed amount and flag $4,500 as non-payable contractual discount.',
          status: 'open'
        },
        {
          id: 'f-4',
          title: 'Inverted Physical Therapy Billing Dates (Pre-Surgery Post-Op Rehab)',
          severity: 'critical',
          category: 'Fraud / Phantom Billing',
          whatHappened: 'Apex OrthoPhysio billed for post-operative knee gait training on August 4, 6, and 8, 2024. The patient was not operated on until August 14, 2024.',
          supportingEvidence: [
            {
              documentTitle: 'Apex OrthoPhysio Invoice #APX-409',
              excerpt: '2024-08-04: Initial Evaluation & Post-Operative Knee Arthroplasty Gait Protocol (CPT 97116): $450.00',
              reference: 'Invoice Line 1'
            },
            {
              documentTitle: 'St. Jude Discharge Summary',
              excerpt: 'Operative Procedure Performed: August 14, 2024',
              reference: 'Surgical Section'
            }
          ],
          whyItMatters: 'Billing for post-operative rehabilitation before surgery has occurred is a recognized red flag for phantom billing, falsified date entries, or pre-dating services.',
          whatShouldHappenNext: 'Suspend all Apex OrthoPhysio disbursements. Request signed therapist daily progress notes and sign-in sheets.',
          status: 'open'
        }
      ],
      missingEvidence: [
        {
          id: 'm-1',
          title: 'FreshMarket Premises Incident / Slip-and-Fall Report',
          importance: 'critical',
          reason: 'Claimant alleges acute slip on produce mist water; store incident report and CCTV log needed to verify whether fall actually occurred on premises.',
          targetParty: 'claimant',
          requested: false
        },
        {
          id: 'm-2',
          title: 'Emergency Room / Urgent Care Triage Intake Record (Aug 2, 2024)',
          importance: 'critical',
          reason: 'Claimant alleges severe traumatic injury on Aug 2, but first medical contact documented in file is elective admission on Aug 14.',
          targetParty: 'hospital',
          requested: false
        },
        {
          id: 'm-3',
          title: 'Apex OrthoPhysio Daily Sign-in Logs & Progress Notes',
          importance: 'moderate',
          reason: 'Required to resolve why dates on invoice precede the surgical intervention.',
          targetParty: 'hospital',
          requested: false
        }
      ],
      recommendedAction: 'ESCALATE_SIU',
      evidenceGraph: {
        nodes: [
          { id: 'claim-root', label: 'Claim #CLM-2024-88412 ($42,650)', type: 'claim', status: 'warning', details: 'Marcus Vance | Right Knee Replacement' },
          { id: 'policy-node', label: 'Policy POL-992144 (SecureShield)', type: 'policy', status: 'ok', details: 'Clause 4.2 Exclusion & Clause 7.1 Cap' },
          { id: 'discharge-node', label: 'Discharge Summary (Dr. Chen)', type: 'medical', status: 'warning', details: 'Aug 14-17 (3 Nights) | Notes 2021 History' },
          { id: 'bill-node', label: 'St. Jude Hospital Bill ($38,200)', type: 'bill', status: 'conflict', details: '4 Nights Charged ($7,200) + Robotic ($6,500)' },
          { id: 'physio-node', label: 'Apex Physio Invoice ($1,350)', type: 'receipt', status: 'conflict', details: 'Billed Aug 4-8 (Predates Surgery)' },
          { id: 'statement-node', label: 'Claimant Affidavit', type: 'statement', status: 'conflict', details: 'Claims pristine knees prior to Aug 2 fall' },
          { id: 'pcp-node', label: '2021 PCP Records (Dr. Lang)', type: 'medical', status: 'ok', details: 'Grade IV Osteoarthritis Diagnosed 2021' },
          { id: 'finding-1', label: 'Pre-Existing Misrepresentation', type: 'finding', status: 'conflict', details: 'Contradicts affidavit; Triggers Clause 4.2' },
          { id: 'finding-2', label: '1-Night Room Overcharge ($1,800)', type: 'finding', status: 'conflict', details: 'Bill (4 nights) vs Summary (3 nights)' },
          { id: 'finding-3', label: 'Robotic Cap Exceeded ($4,500)', type: 'finding', status: 'warning', details: 'Bill $6,500 vs Cap $2,000' },
          { id: 'finding-4', label: 'Inverted Therapy Dates ($1,350)', type: 'finding', status: 'conflict', details: 'Post-op therapy billed pre-op' }
        ],
        links: [
          { id: 'l1', source: 'claim-root', target: 'policy-node', label: 'governed by', status: 'verified' },
          { id: 'l2', source: 'claim-root', target: 'statement-node', label: 'asserted by', status: 'verified' },
          { id: 'l3', source: 'claim-root', target: 'bill-node', label: 'claims reimbursement for', status: 'pending' },
          { id: 'l4', source: 'claim-root', target: 'physio-node', label: 'claims reimbursement for', status: 'pending' },
          { id: 'l5', source: 'bill-node', target: 'discharge-node', label: 'service duration mismatch', status: 'conflict' },
          { id: 'l6', source: 'statement-node', target: 'pcp-node', label: 'factual contradiction', status: 'conflict' },
          { id: 'l7', source: 'policy-node', target: 'pcp-node', label: 'triggers Clause 4.2 exclusion', status: 'conflict' },
          { id: 'l8', source: 'policy-node', target: 'bill-node', label: 'triggers Clause 7.1 cap', status: 'conflict' },
          { id: 'l9', source: 'physio-node', target: 'discharge-node', label: 'timeline reversal', status: 'conflict' },
          { id: 'l10', source: 'statement-node', target: 'finding-1', label: 'generates', status: 'conflict' },
          { id: 'l11', source: 'bill-node', target: 'finding-2', label: 'generates', status: 'conflict' },
          { id: 'l12', source: 'bill-node', target: 'finding-3', label: 'generates', status: 'conflict' },
          { id: 'l13', source: 'physio-node', target: 'finding-4', label: 'generates', status: 'conflict' }
        ]
      }
    }
  },
  {
    id: 'case-2',
    claimNumber: 'CLM-2024-91032',
    policyNumber: 'AUT-401928-PREM',
    claimantName: 'Elena Rostova',
    claimantDob: '1988-11-23',
    dateOfIncident: '2024-07-19',
    filingDate: '2024-08-05',
    claimType: 'auto',
    title: 'Rear-End Collision Whiplash with Disputed Lost Wages & Low Impact Damage',
    description: 'Claimant filed for $18,400 citing severe cervical spine trauma and 4 weeks lost wages from a rear-end collision at a traffic light.',
    claimedAmount: 18400,
    documents: [
      {
        id: 'c2-doc-1',
        title: 'Metro Police Department — Traffic Collision Report #TR-24-0891',
        type: 'incident_report',
        date: '2024-07-19',
        authorOrProvider: 'Officer J. Martinez, Metro Police Dept',
        summary: 'Official police crash investigation report. Documents low-speed impact (<5 mph) and minor cosmetic bumper scratch.',
        fullContent: `METROPOLITAN POLICE DEPARTMENT — MOTOR VEHICLE TRAFFIC ACCIDENT REPORT
Incident Number: TR-24-0891 | Date: July 19, 2024 at 16:40 hrs
Location: Intersection of Elm St & 4th Avenue, City Center

Vehicle 1 (Claimant): 2022 Honda Civic (Driven by Elena Rostova)
Vehicle 2: 2019 Ford F-150 (Driven by Samuel Vance)

Officer Narrative:
Vehicle 1 was stationary at red light. Vehicle 2 rolled forward from stop during stop-and-go traffic at estimated speed under 5 MPH, making contact with rear bumper of Vehicle 1.
Damage to Vehicle 1: Superficial paint transfer on rear plastic bumper fascia. Airbags did not deploy. Vehicle was fully drivable.
Driver 1 (Elena Rostova) declined on-scene EMS evaluation, stated she felt slightly shaken up but had no immediate visible injury. Left scene driving vehicle.`,
        extractedFacts: [
          { label: 'Impact Speed', value: 'Estimated < 5 MPH', confidence: 0.98, flag: 'suspicious' },
          { label: 'Vehicle Damage', value: 'Cosmetic paint scratch only; Drivable', confidence: 0.99, flag: 'suspicious' },
          { label: 'On-Scene EMS', value: 'Declined medical evaluation', confidence: 1.0, flag: 'ok' }
        ]
      },
      {
        id: 'c2-doc-2',
        title: 'Veritas Spine Care — Medical Assessment & Cervical MRI',
        type: 'medical_report',
        date: '2024-07-26',
        authorOrProvider: 'Dr. Gregory Hayes, DC, MD',
        summary: 'Report from private chiropractic clinic diagnosing acute severe radiculopathy and prescribing 36 therapy sessions.',
        fullContent: `VERITAS SPINE & CHIROPRACTIC CARE
Patient: Elena Rostova | Initial Evaluation: July 26, 2024 (7 days post-incident)
Physician: Dr. Gregory Hayes, DC, MD

Chief Complaint: Severe debilitating neck pain, radiating to left shoulder and arm, rated 9/10, allegedly resulting from catastrophic motor vehicle collision.
Physical Exam: Restricted cervical range of motion. Severe muscle spasm throughout trapezius.
Treatment Plan: 3x weekly spinal decompression, electrical muscle stimulation, and active physical therapy for 12 weeks (36 sessions total).
Medical Total Estimate: $11,200.00.`,
        extractedFacts: [
          { label: 'First Medical Visit', value: 'July 26 (7 days post-accident)', confidence: 0.99, flag: 'suspicious' },
          { label: 'Treatment Cost', value: '$11,200.00', confidence: 1.0, flag: 'ok' },
          { label: 'Severity Rating', value: 'Debilitating 9/10 pain with 36 therapy sessions', confidence: 0.95, flag: 'suspicious' }
        ]
      },
      {
        id: 'c2-doc-3',
        title: 'Employer Wage Verification & VPN Access Logs',
        type: 'receipt',
        date: '2024-08-02',
        authorOrProvider: 'FinTech Cloud Systems Inc. — HR Department',
        summary: 'Employer verification showing claimant logged full 40 hours remote work during alleged "totally incapacitated" disability period.',
        fullContent: `FINTECH CLOUD SYSTEMS INC. — HR & PAYROLL VERIFICATION
Employee: Elena Rostova | Role: Senior Financial Analyst
Claim: Claimant asserts $7,200 in total lost wage compensation for 4 consecutive weeks of complete work incapacity (July 20 - August 16, 2024).

Payroll & System Audit:
Employee was granted remote work authorization. IT Security access logs confirm employee logged into corporate virtual private network (VPN) and submitted regular daily sprint deliverables on:
- Week 1 (July 22 - July 26): 38.5 active hours recorded.
- Week 2 (July 29 - August 02): 41.2 active hours recorded.
Employee received full salaried payroll direct deposits with zero unpaid sick leave days docked.`,
        extractedFacts: [
          { label: 'Claimed Lost Wages', value: '$7,200.00 (4 Weeks Incapacity)', confidence: 1.0, flag: 'mismatch' },
          { label: 'Actual Hours Worked', value: 'Full remote work logged (38.5 - 41.2 hrs/wk)', confidence: 0.99, flag: 'mismatch' },
          { label: 'Payroll Impact', value: 'Zero lost wages, full direct deposit paid', confidence: 1.0, flag: 'mismatch' }
        ]
      }
    ],
    report: {
      summary: 'Cross-document verification between the police accident reconstruction, chiropractic treatment plan, and employer HR records revealed a complete contradiction in the claimant’s $7,200 lost wage demand. The police crash report establishes a sub-5 MPH parking lot tap with zero structural damage, yet claimant sought $11,200 in intensive therapy after a 7-day treatment delay. Crucially, employer VPN and payroll audits prove the claimant worked full-time remote hours and suffered zero lost earnings.',
      riskScore: 92,
      riskLevel: 'CRITICAL',
      coverage: {
        isCovered: 'partial',
        statusText: 'Fraud Flag — Disallowed Lost Wages & Bio-Mechanical Discrepancy',
        policyNumber: 'AUT-401928-PREM',
        clausesApplied: [
          { clauseId: 'Part B-1', description: 'Bodily Injury & Medical Payments subject to biomechanical injury causation review', impact: 'capped', amountImpact: 11200 },
          { clauseId: 'Part B-2', description: 'Lost Earnings Indemnity requires proof of actual net income deduction', impact: 'excluded', amountImpact: 7200 }
        ],
        claimedAmount: 18400,
        allowedAmount: 2500,
        deductible: 500,
        unauthorizedAmount: 15400,
        notes: 'Wage claim of $7,200 must be denied outright due to verified ongoing payroll. Medical payment is suspended pending Independent Medical Examination (IME).'
      },
      verifications: [
        {
          id: 'v-c2-1',
          category: 'amounts',
          title: 'Lost Wage Indemnity Proof of Loss',
          status: 'mismatch',
          expectedValue: 'Actual uncompensated wage deduction evidenced by employer',
          actualValues: [
            { documentTitle: 'Claimant Application', value: 'Demanded $7,200 for 4 weeks total disability' },
            { documentTitle: 'Employer HR Records', value: 'Employee logged 40h/week remote and received 100% regular salary' }
          ],
          explanation: 'Claimant suffered zero financial loss of income. Demanding $7,200 for wages already received constitutes fraudulent double-recovery.'
        },
        {
          id: 'v-c2-2',
          category: 'treatments',
          title: 'Biomechanical Causation vs. Reported Impact',
          status: 'flagged',
          expectedValue: 'Injury severity proportionate to mechanical crash forces',
          actualValues: [
            { documentTitle: 'Police Crash Report', value: '< 5 MPH roll; cosmetic bumper scratch; drove away' },
            { documentTitle: 'Veritas Spine Care', value: '36 intensive decompression sessions for alleged severe radiculopathy' }
          ],
          explanation: 'Disproportionate treatment plan: Low-velocity bumper scratch unlikely to generate delta-V forces capable of producing acute severe radiculopathy.'
        }
      ],
      findings: [
        {
          id: 'f-c2-1',
          title: 'Fictitious Lost Wage Indemnity Claim ($7,200)',
          severity: 'critical',
          category: 'Fraud Detection',
          whatHappened: 'Claimant claimed $7,200 for 4 weeks of complete incapacitation from employment. Company HR records verify claimant logged into company VPN every business day and was fully compensated.',
          supportingEvidence: [
            { documentTitle: 'Employer HR Verification', excerpt: 'Employee received full salaried payroll direct deposits with zero unpaid sick leave days docked.', reference: 'Payroll Audit' },
            { documentTitle: 'Claim Filing', excerpt: 'Demands $7,200 for 4 weeks total disability.', reference: 'Schedule B' }
          ],
          whyItMatters: 'Direct fraud violation. Claiming wage loss when fully paid is criminal misrepresentation.',
          whatShouldHappenNext: 'Disallow $7,200 wage claim immediately and issue SIU referral for intentional false claim filing.',
          status: 'open'
        }
      ],
      missingEvidence: [
        {
          id: 'm-c2-1',
          title: 'Color Photos of Honda Civic Rear Bumper Fascia',
          importance: 'critical',
          reason: 'Required for forensic accident reconstruction to verify low impact force.',
          targetParty: 'claimant',
          requested: true
        }
      ],
      recommendedAction: 'ESCALATE_SIU',
      evidenceGraph: {
        nodes: [
          { id: 'claim-c2', label: 'Claim #CLM-2024-91032 ($18,400)', type: 'claim', status: 'conflict' },
          { id: 'police-c2', label: 'Police Report (<5 MPH)', type: 'statement', status: 'ok' },
          { id: 'spine-c2', label: 'Veritas Spine ($11,200)', type: 'medical', status: 'warning' },
          { id: 'hr-c2', label: 'Employer HR Logs (Full Wages Paid)', type: 'bill', status: 'conflict' },
          { id: 'finding-c2', label: 'Fictitious Wage Claim', type: 'finding', status: 'conflict' }
        ],
        links: [
          { id: 'cl1', source: 'claim-c2', target: 'police-c2', label: 'involves', status: 'verified' },
          { id: 'cl2', source: 'claim-c2', target: 'spine-c2', label: 'bills for', status: 'pending' },
          { id: 'cl3', source: 'claim-c2', target: 'hr-c2', label: 'contradicted by', status: 'conflict' },
          { id: 'cl4', source: 'hr-c2', target: 'finding-c2', label: 'triggers', status: 'conflict' },
          { id: 'cl5', source: 'police-c2', target: 'spine-c2', label: 'biomechanical mismatch', status: 'conflict' }
        ]
      }
    }
  },
  {
    id: 'case-3',
    claimNumber: 'CLM-2024-34190',
    policyNumber: 'POL-108221-SILVER',
    claimantName: 'David K. Park',
    claimantDob: '1992-03-14',
    dateOfIncident: '2024-08-11',
    filingDate: '2024-08-18',
    claimType: 'health',
    title: 'Emergency Laparoscopic Appendectomy (Clean Verification)',
    description: 'Claimant admitted through ER with acute appendicitis. Standard 24h inpatient laparoscopic removal.',
    claimedAmount: 7350,
    documents: [
      {
        id: 'c3-doc-1',
        title: 'SilverCare Health Policy #POL-108221',
        type: 'policy',
        date: '2023-01-01',
        authorOrProvider: 'SilverCare Health Plan',
        summary: 'Emergency surgery coverage: 100% covered after $500 emergency copay. In-network preferred tier.',
        fullContent: `SILVERCARE COMPREHENSIVE POLICY
Section 3.1: Emergency surgery performed at in-network facility is covered at 100% following payment of $500 deductible.`,
        extractedFacts: [
          { label: 'Emergency Surgery Coverage', value: '100% In-Network', confidence: 1.0, flag: 'ok' },
          { label: 'Deductible', value: '$500 Copay', confidence: 1.0, flag: 'ok' }
        ]
      },
      {
        id: 'c3-doc-2',
        title: 'City General Hospital — Operative Note & Pathology',
        type: 'medical_report',
        date: '2024-08-11',
        authorOrProvider: 'Dr. Sarah Jenkins, MD',
        summary: 'Pathology confirms acute suppurative appendicitis. Clean emergency laparoscopic removal.',
        fullContent: `CITY GENERAL HOSPITAL — SURGICAL REPORT
Patient: David K. Park | Date: August 11, 2024
Pre-Op Diagnosis: Acute right lower quadrant abdominal pain, elevated WBC (16.2k).
Procedure: Laparoscopic Appendectomy (CPT 44970).
Pathology: Acute suppurative appendicitis with mucosal ulceration. No perforation. Patient discharged stable on Aug 12.`,
        extractedFacts: [
          { label: 'Pathology Confirmation', value: 'Acute Suppurative Appendicitis (Verified)', confidence: 0.99, flag: 'ok' },
          { label: 'Stay Duration', value: '24 Hours (Aug 11 - Aug 12)', confidence: 0.99, flag: 'ok' }
        ]
      },
      {
        id: 'c3-doc-3',
        title: 'City General Hospital — Inpatient Bill',
        type: 'hospital_bill',
        date: '2024-08-14',
        authorOrProvider: 'City General Billing',
        summary: 'Itemized bill for $7,350 matching negotiated contracted fee schedules.',
        fullContent: `CITY GENERAL HOSPITAL — ITEMIZATION
Patient: David K. Park | Claim: CLM-2024-34190
- Operating Room: $4,200.00
- Anesthesia: $1,400.00
- 1 Night Observation: $1,250.00
- Pharmacy & Lab: $500.00
TOTAL: $7,350.00.`,
        extractedFacts: [
          { label: 'Total Billed', value: '$7,350.00', confidence: 1.0, flag: 'ok' },
          { label: 'Fee Schedule Alignment', value: 'Exact match with negotiated rates', confidence: 1.0, flag: 'ok' }
        ]
      }
    ],
    report: {
      summary: 'Full automated cross-document verification passed with 100% consistency. Pathological specimens confirm acute non-preexisting appendicitis. Dates, times, procedural codes, and hospital charges align precisely with in-network fee schedules. Fast-track approval recommended.',
      riskScore: 8,
      riskLevel: 'LOW',
      coverage: {
        isCovered: true,
        statusText: 'Fully Covered In-Network Emergency Surgery',
        policyNumber: 'POL-108221-SILVER',
        clausesApplied: [
          { clauseId: 'Clause 3.1', description: 'Emergency Surgical In-Network Benefit', impact: 'covered', amountImpact: 6850 },
          { clauseId: 'Clause 1.2', description: 'Standard Emergency Deductible', impact: 'covered', amountImpact: 500 }
        ],
        claimedAmount: 7350,
        allowedAmount: 6850,
        deductible: 500,
        unauthorizedAmount: 0,
        notes: 'Net claim payable to provider is $6,850.00 after $500 member deductible.'
      },
      verifications: [
        {
          id: 'v-c3-1',
          category: 'dates',
          title: 'Procedure & Discharge Alignment',
          status: 'matched',
          expectedValue: 'August 11 - August 12 (1 Day)',
          actualValues: [
            { documentTitle: 'Operative Report', value: 'Admitted Aug 11, discharged Aug 12' },
            { documentTitle: 'Hospital Bill', value: '1 Night Observation' }
          ],
          explanation: 'Exact match between physician chart and hospital invoice.'
        },
        {
          id: 'v-c3-2',
          category: 'treatments',
          title: 'Pathological Confirmation of Acute Emergency',
          status: 'matched',
          expectedValue: 'Acute condition with no prior chronic latency',
          actualValues: [
            { documentTitle: 'Pathology Report', value: 'Acute suppurative appendicitis verified' }
          ],
          explanation: 'Histopathology confirms acute sudden onset, satisfying emergency criteria.'
        }
      ],
      findings: [
        {
          id: 'f-c3-1',
          title: 'All Inpatient Evidence Verified & Consistent',
          severity: 'verified',
          category: 'Audit Clearance',
          whatHappened: 'Cross-document verification verified patient identity, in-network facility status, emergency onset, and exact contracted charge rates.',
          supportingEvidence: [
            { documentTitle: 'Operative Report', excerpt: 'Laparoscopic Appendectomy (CPT 44970) successfully performed.', reference: 'Page 1' },
            { documentTitle: 'Policy Contract', excerpt: 'Emergency surgery covered at 100% after $500 deductible.', reference: 'Section 3.1' }
          ],
          whyItMatters: 'Eligible for straight-through automated claims adjudication.',
          whatShouldHappenNext: 'Issue payment remittance of $6,850 to City General Hospital.',
          status: 'resolved'
        }
      ],
      missingEvidence: [],
      recommendedAction: 'APPROVE',
      evidenceGraph: {
        nodes: [
          { id: 'c3-claim', label: 'Claim #CLM-2024-34190 ($7,350)', type: 'claim', status: 'ok' },
          { id: 'c3-policy', label: 'SilverCare Policy', type: 'policy', status: 'ok' },
          { id: 'c3-op', label: 'Operative Report', type: 'medical', status: 'ok' },
          { id: 'c3-bill', label: 'Hospital Bill ($7,350)', type: 'bill', status: 'ok' },
          { id: 'c3-finding', label: 'Approved Settlement', type: 'finding', status: 'ok' }
        ],
        links: [
          { id: 'l-c3-1', source: 'c3-claim', target: 'c3-policy', label: 'covered under', status: 'verified' },
          { id: 'l-c3-2', source: 'c3-claim', target: 'c3-op', label: 'supported by', status: 'verified' },
          { id: 'l-c3-3', source: 'c3-claim', target: 'c3-bill', label: 'reimburses', status: 'verified' },
          { id: 'l-c3-4', source: 'c3-bill', target: 'c3-finding', label: 'authorizes', status: 'verified' }
        ]
      }
    }
  }
];
