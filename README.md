<div align="center">

# 🛡️ ClaimGuard AI
### Intelligent Insurance Claim Investigator

**AI-powered forensic investigation platform for insurance claim adjudication**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

## 📋 Overview

**ClaimGuard AI** is a forensic-grade insurance claim investigation platform built for SIU (Special Investigation Unit) examiners and claims adjudicators. It leverages **Google Gemini AI** to perform intelligent cross-document analysis, detect fraud signals, reconcile financial sub-limits, and generate audit-ready dossiers — all in a sleek, real-time workspace.

### 🔍 Real Case Example
The demo investigates Claim **CLM-20481** (Aarav Sharma — ₹4,85,000 health claim) and automatically surfaces:
- ⚠️ **48-hour chronological contradiction** — surgery date (12 AUG) precedes recorded admission (14 AUG)
- 💰 **Policy Clause 4.3 sublimit breach** — room rent billed at ₹14,000/day vs. ₹8,000/day cap (₹36,000 excess)
- 🔬 **Missing histopathology report** — mandatory under Clause 6.2 before disbursement

## ✨ Features

| Feature | Description |
|---|---|
| 🔎 **Forensic Investigation Workspace** | Full claim timeline, evidence pipeline, and annotation tools |
| 📄 **Document Intelligence Viewer** | Split-screen document reader with extracted facts & confidence scores |
| 🕸️ **Interactive Evidence Graph** | Node-link relational topology of all documents, conflicts & findings |
| ✅ **Cross-Document Verification Matrix** | Automated multi-source corroboration with investigator sign-off |
| 📊 **Explainable AI Findings** | Bilingual (English + Hindi) forensic findings with Markdown rendering |
| 💼 **Audit Dossier Modal** | Printable / exportable SIU forensic memorandum |
| 🤖 **Gemini AI Copilot** | Conversational investigator assistant powered by Gemini |
| 🔄 **Re-verify Claim Pipeline** | Animated 4-step AI re-analysis with live progress tracking |
| 👤 **SIU Examiner Profile** | Investigator credentials, clearance level & adjudication track record |
| 🧾 **Financial Reconciliation** | Sub-limit adjudication table with clause-by-clause breakdown |
| ➕ **New Claim Ingestion** | Modal form to load new claims into the investigation queue |

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript 5.8, Vite 6
- **Styling:** Tailwind CSS v4, custom warm-ivory design system
- **AI:** Google Gemini AI (`@google/genai`) via Express backend
- **Charts/Graph:** Custom SVG canvas with D3-inspired physics layout
- **Icons:** Lucide React
- **Markdown:** `react-markdown` (for bilingual forensic findings)
- **PDF Export:** `jsPDF`
- **Animation:** `motion` (Framer Motion)

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tanya-garg10/ClaimGuard-AI-Intelligent-Insurance-Claim-Investigator.git
cd ClaimGuard-AI-Intelligent-Insurance-Claim-Investigator

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your Gemini API key:
# GEMINI_API_KEY="your_actual_api_key_here"

# 4. Start the development server
npm run dev
```

The app will be running at **[http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
claimguard-ai/
├── src/
│   ├── App.tsx                          # Root app, routing & state management
│   ├── types.ts                         # TypeScript interfaces & types
│   ├── index.css                        # Global styles & design tokens
│   ├── components/
│   │   ├── Header.tsx                   # Sticky nav with case selector
│   │   ├── ClaimListView.tsx            # Claim queue with risk cards
│   │   ├── InvestigationWorkspace.tsx   # Main forensic investigation view
│   │   ├── DocumentIntelligenceViewer.tsx # Split-screen document reader
│   │   ├── EvidenceGraph.tsx            # Interactive relational graph
│   │   ├── VerificationMatrix.tsx       # Cross-document audit checklist
│   │   ├── ExplainableFindings.tsx      # AI findings with markdown
│   │   ├── AuditDossierModal.tsx        # Printable SIU memorandum
│   │   ├── ExaminerProfileModal.tsx     # SIU examiner credentials
│   │   ├── ReverifyProgressModal.tsx    # Re-analysis pipeline modal
│   │   ├── InvestigatorCopilot.tsx      # Gemini AI chat assistant
│   │   ├── NewClaimModal.tsx            # Claim ingestion form
│   │   ├── RfiModal.tsx                 # Request for Information modal
│   │   ├── CoverageAssessmentCard.tsx   # Sub-limit adjudication card
│   │   ├── AnnotationFindings.tsx       # Annotated evidence findings
│   │   ├── HumanInTheLoopActionBar.tsx  # Adjudication decision controls
│   │   ├── ClaimIntelligenceCanvas.tsx  # Intelligence summary canvas
│   │   ├── EvidenceDossier.tsx          # Evidence dossier panel
│   │   ├── PipelineStepper.tsx          # Investigation step tracker
│   │   └── RiskSpectrum.tsx             # Risk level visual indicator
│   └── data/
│       └── mockClaims.ts                # Sample claim dataset (CLM-20481)
├── server.ts                            # Express server + Gemini API proxy
├── .env.example                         # Environment variable template
├── vite.config.ts                       # Vite build configuration
└── package.json
```

## 🧭 Navigation

| Tab | Description |
|---|---|
| **Overview** | Dashboard with active claim spotlight, key metrics & claim queue |
| **Claims** | Full claim queue with horizontal dossier cards |
| **Investigations** | Forensic workspace — findings, verification, adjudication controls |
| **Evidence** | Document viewer, relational evidence graph & verification matrix |
| **Reports** | Formal SIU Audit Memorandum with financial reconciliation table |

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for AI analysis & Copilot |
| `APP_URL` | Optional | Deployment URL (auto-injected on Cloud Run) |

> **Security Note:** Never commit your actual API key. The `.env.local` file is gitignored by default.

## 📜 Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # TypeScript type check
```

## 👩‍💻 Author

**Tanya Garg** — [GitHub @Tanya-garg10](https://github.com/Tanya-garg10)

Built with ❤️ using **Google Gemini AI** and **React**

<div align="center">
<sub>ClaimGuard AI — Forensic Intelligence for the Modern Insurance Industry</sub>
</div>
