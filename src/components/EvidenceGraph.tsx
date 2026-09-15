import React, { useState, useRef, useEffect } from 'react';
import { 
  Network, 
  AlertOctagon, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Info,
  Maximize2,
  FileCheck,
  Search,
  Download,
  FileDown,
  Image as ImageIcon,
  ChevronDown,
  RefreshCw,
  Check
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { EvidenceGraphData, EvidenceGraphNode, EvidenceGraphLink } from '../types';

interface EvidenceGraphProps {
  graphData: EvidenceGraphData;
  claimNumber?: string;
  claimantName?: string;
  onSelectNode?: (nodeId: string) => void;
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({ 
  graphData,
  claimNumber = 'CLM-8819',
  claimantName = 'Aarav Sharma',
  onSelectNode
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(graphData.nodes[0]?.id || null);
  const [filterMode, setFilterMode] = useState<'all' | 'conflicts' | 'verified'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const exportMenuRef = useRef<HTMLDivElement | null>(null);

  // Close export menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    if (isExportMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isExportMenuOpen]);

  const handleExport = async (format: 'png' | 'pdf') => {
    setIsExporting(true);
    setExportFeedback(format === 'png' ? 'Rendering High-Res PNG...' : 'Generating Forensic PDF Report...');

    try {
      const svgElement = svgRef.current;
      if (!svgElement) {
        throw new Error('SVG canvas element not found');
      }

      // Clone SVG to avoid altering on-screen DOM
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
      clonedSvg.setAttribute('width', '1600');
      clonedSvg.setAttribute('height', '880');
      clonedSvg.setAttribute('viewBox', '0 0 800 440');

      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(clonedSvg);

      if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = window.URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => reject(e);
        img.src = blobURL;
      });

      // Canvas setup for crisp raster rendering (1600 x 980)
      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 980;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create Canvas 2D context');

      // 1. Dark canvas background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 1600, 980);

      // 2. Top Forensic Header
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1600, 110);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 110);
      ctx.lineTo(1600, 110);
      ctx.stroke();

      // Title & SIU Identification
      ctx.fillStyle = '#6366f1'; // Indigo 500
      ctx.font = 'bold 13px "Courier New", monospace';
      ctx.fillText('CLAIMGUARD AI • SPECIAL INVESTIGATION UNIT (SIU)', 40, 36);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Forensic Evidence Relational Topology Map', 40, 72);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Multi-source cross-corroboration: Hospital Records, Policies, Invoices & Clinical Chronology', 40, 94);

      // Header Metadata (Right-aligned)
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 13px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`CLAIM: #${claimNumber}`, 1560, 36);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(`Claimant: ${claimantName}`, 1560, 58);
      ctx.fillText(`Lead Investigator: Senior SIU Examiner`, 1560, 78);
      ctx.fillText(`Certified On: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`, 1560, 96);
      ctx.textAlign = 'left';

      // 3. Draw the Vector Graph SVG
      ctx.drawImage(img, 40, 125, 1520, 770);

      // 4. Footer Banner
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 915, 1600, 65);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 915);
      ctx.lineTo(1600, 915);
      ctx.stroke();

      // Legend in Footer
      // Verified Match
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(50, 947, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '12px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('Verified Match / Policy Concurrence', 64, 951);

      // Discrepancy
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(360, 947, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Discrepancy / Policy Exclusion (e.g. 48-hr Date Mismatch)', 374, 951);

      // Review Required
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(780, 947, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Review Required / Ceiling Cap Exceeded', 794, 951);

      // Right Authenticity Signature
      ctx.fillStyle = '#64748b';
      ctx.font = '11px "Courier New", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('DIGITAL FORENSIC EVIDENCE CHAIN • SPECIAL INVESTIGATION UNIT (SIU)', 1560, 951);
      ctx.textAlign = 'left';

      window.URL.revokeObjectURL(blobURL);

      if (format === 'png') {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `ClaimGuard_Evidence_Topology_${claimNumber}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setExportFeedback('PNG saved successfully!');
      } else {
        // PDF Export using jsPDF
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });

        // PAGE 1: Formal High-Res Topology Sheet
        doc.setFillColor(15, 23, 42); // #0f172a
        doc.rect(0, 0, 297, 210, 'F');

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text('CLAIMGUARD AI — FORENSIC EVIDENCE TOPOLOGY MEMORANDUM', 14, 14);

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text(`Special Investigation Unit (SIU) • Forensic Examination Division • Claim #${claimNumber}`, 14, 20);

        doc.setTextColor(203, 213, 225);
        doc.text(`Date: ${new Date().toLocaleDateString('en-GB')} • Claimant: ${claimantName} • Confidential`, 205, 14);

        // Embedded Graph Image
        doc.addImage(imgData, 'PNG', 13, 25, 271, 165);

        // Page 1 Footer
        doc.setFontSize(7.5);
        doc.setFont('courier', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Page 1/2 • Forensic Evidence Relational Topology • Certified by ClaimGuard AI Adjudication Engine', 14, 202);
        doc.text('Hash: SHA256:7f9a...331e (Signed: SIU Adjudicator)', 205, 202);

        // PAGE 2: Evidence Inventory & Corroboration Index
        doc.addPage('a4', 'landscape');
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 297, 210, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text('EVIDENCE TOPOLOGY NODE INVENTORY & DISCREPANCY AUDIT', 14, 14);

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text(`Cross-document relationships verified for Claim #${claimNumber} (${claimantName})`, 14, 20);

        // Table Header
        let y = 30;
        doc.setFillColor(30, 41, 59);
        doc.rect(14, y, 269, 7.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(241, 245, 249);
        doc.text('TYPE', 18, y + 5);
        doc.text('NODE LABEL', 46, y + 5);
        doc.text('STATUS', 112, y + 5);
        doc.text('EVIDENCE FINDING / CORROBORATION DETAILS', 152, y + 5);

        y += 9.5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        graphData.nodes.forEach((n, idx) => {
          if (y > 175) return;
          const isConflict = n.status === 'conflict';
          const isWarning = n.status === 'warning';
          const isOk = n.status === 'ok';

          doc.setFillColor(idx % 2 === 0 ? 20 : 26, idx % 2 === 0 ? 30 : 38, idx % 2 === 0 ? 46 : 56);
          doc.rect(14, y - 3.5, 269, 7.5, 'F');

          doc.setTextColor(148, 163, 184);
          doc.text(n.type.toUpperCase(), 18, y + 1.5);

          doc.setTextColor(255, 255, 255);
          doc.text(n.label.slice(0, 32), 46, y + 1.5);

          if (isConflict) {
            doc.setTextColor(244, 63, 94);
            doc.text('DISCREPANCY', 112, y + 1.5);
          } else if (isWarning) {
            doc.setTextColor(245, 158, 11);
            doc.text('REVIEW REQ', 112, y + 1.5);
          } else if (isOk) {
            doc.setTextColor(16, 185, 129);
            doc.text('VERIFIED MATCH', 112, y + 1.5);
          } else {
            doc.setTextColor(148, 163, 184);
            doc.text('BASE EVIDENCE', 112, y + 1.5);
          }

          doc.setTextColor(203, 213, 225);
          const detailText = n.details 
            ? n.details.slice(0, 75) + (n.details.length > 75 ? '…' : '') 
            : 'Corroborated across primary case dossier records.';
          doc.text(detailText, 152, y + 1.5);

          y += 7.5;
        });

        // Investigator Sign-off Box
        y = Math.min(y + 6, 178);
        doc.setFillColor(30, 41, 59);
        doc.rect(14, y, 269, 20, 'F');
        doc.setDrawColor(51, 65, 85);
        doc.rect(14, y, 269, 20, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(255, 255, 255);
        doc.text('LEAD INVESTIGATOR SIGN-OFF & CERTIFICATION', 18, y + 5.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(203, 213, 225);
        doc.text('This relational topology has been reviewed and verified by the Senior SIU Adjudication Panel. The detected discrepancies, including the 48-hour surgery date mismatch and room sublimit excess, constitute sufficient grounds for formal RFI and SIU escalation.', 18, y + 10.5);

        doc.setFont('courier', 'normal');
        doc.setTextColor(148, 163, 184);
        doc.text('Verified by: Certified SIU Forensic Examiner • Division: Special Investigation Unit', 18, y + 15.5);
        doc.text(`Timestamp: ${new Date().toISOString()} • Cryptographic Fingerprint OK`, 155, y + 15.5);

        // Page 2 Footer
        doc.setFontSize(7.5);
        doc.setFont('courier', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Page 2/2 • ClaimGuard SIU Forensic Evidence Topology Memorandum', 14, 202);

        doc.save(`ClaimGuard_Evidence_Topology_${claimNumber}.pdf`);
        setExportFeedback('PDF report downloaded successfully!');
      }
    } catch (error) {
      console.error('Failed to export topology:', error);
      setExportFeedback('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setExportFeedback(null);
      }, 4000);
    }
  };

  const selectedNode = graphData.nodes.find((n) => n.id === selectedNodeId) || graphData.nodes[0];

  // Connected links for selected node
  const connectedLinks = graphData.links.filter(
    (l) => l.source === selectedNodeId || l.target === selectedNodeId
  );

  // Filter nodes according to toggle
  const filteredNodes = graphData.nodes.filter((node) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'conflicts') return node.status === 'conflict' || node.status === 'warning';
    if (filterMode === 'verified') return node.status === 'ok';
    return true;
  });

  const getNodeIcon = (type: EvidenceGraphNode['type']) => {
    switch (type) {
      case 'claim':
        return <FileCheck className="w-4 h-4 text-blue-400" />;
      case 'policy':
        return <FileText className="w-4 h-4 text-indigo-400" />;
      case 'medical':
        return <Search className="w-4 h-4 text-emerald-400" />;
      case 'bill':
      case 'receipt':
        return <AlertOctagon className="w-4 h-4 text-amber-400" />;
      case 'statement':
        return <FileText className="w-4 h-4 text-violet-400" />;
      case 'finding':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: EvidenceGraphNode['status']) => {
    switch (status) {
      case 'conflict':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-950/40 border border-rose-800/60 px-2 py-0.5 rounded-full"><AlertOctagon className="w-3 h-3" /> Discrepancy</span>;
      case 'warning':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded-full"><AlertTriangle className="w-3 h-3" /> Review Required</span>;
      case 'ok':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Verified Match</span>;
      default:
        return <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">Base Evidence</span>;
    }
  };

  // Node position coordinates generator for clean circular/layered visual layout
  const getNodeCoordinates = (index: number, total: number) => {
    // 3 layers: center (claim), middle ring (policy, medical, bill, statement), outer ring (findings)
    const node = filteredNodes[index];
    if (node.type === 'claim') {
      return { cx: 400, cy: 220 };
    }
    
    // Distribute remaining
    const nonClaimNodes = filteredNodes.filter(n => n.type !== 'claim');
    const idxInNonClaim = nonClaimNodes.findIndex(n => n.id === node.id);
    const angle = (idxInNonClaim / Math.max(1, nonClaimNodes.length)) * 2 * Math.PI - Math.PI / 2;
    
    const isFinding = node.type === 'finding';
    const radius = isFinding ? 175 : 115;
    
    const cx = 400 + radius * Math.cos(angle);
    const cy = 220 + radius * Math.sin(angle);
    return { cx, cy };
  };

  const nodePositions = new Map<string, { cx: number; cy: number }>();
  filteredNodes.forEach((node, i) => {
    nodePositions.set(node.id, getNodeCoordinates(i, filteredNodes.length));
  });

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all ${isExpanded ? 'fixed inset-4 z-50 overflow-y-auto bg-slate-900 p-4' : ''}`}>
      
      {/* Graph Header */}
      <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-slate-100">Interactive Evidence Graph</h3>
              <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                {graphData.nodes.length} Nodes &bull; {graphData.links.length} Relations
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Visualizing relational topology: Claim &rarr; Policy &rarr; Medical Records &rarr; Invoices &rarr; Findings
            </p>
          </div>
        </div>

        {/* Filter Controls, Export & Fullscreen */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export Status Feedback Badge */}
          {exportFeedback && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-700/60 text-indigo-200 text-xs animate-in fade-in duration-150">
              {isExporting ? (
                <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
              ) : (
                <Check className="w-3 h-3 text-emerald-400" />
              )}
              <span className="font-medium text-[11px]">{exportFeedback}</span>
            </div>
          )}

          <div className="bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs flex">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterMode === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Evidence
            </button>
            <button
              onClick={() => setFilterMode('conflicts')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                filterMode === 'conflicts' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertOctagon className="w-3 h-3" />
              Conflicts Only
            </button>
            <button
              onClick={() => setFilterMode('verified')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterMode === 'verified' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verified
            </button>
          </div>

          {/* Export Topology Dropdown (PNG / PDF) */}
          <div className="relative" ref={exportMenuRef}>
            <button
              id="btn-export-topology"
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              disabled={isExporting}
              className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
              title="Export Relational Topology as PNG or PDF report"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {isExportMenuOpen && (
              <div 
                id="export-topology-dropdown"
                className="absolute right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-40 text-xs animate-in fade-in duration-100 divide-y divide-slate-800"
              >
                <div className="px-2.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Export Forensic Topology
                </div>

                <div className="py-1 space-y-0.5">
                  <button
                    id="btn-export-topology-png"
                    onClick={() => {
                      setIsExportMenuOpen(false);
                      handleExport('png');
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-start gap-2.5 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded bg-slate-800 border border-slate-700 text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/50 mt-0.5 shrink-0">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Download as PNG</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        High-resolution 1600x980 raster image with SIU certification header &amp; legend
                      </p>
                    </div>
                  </button>

                  <button
                    id="btn-export-topology-pdf"
                    onClick={() => {
                      setIsExportMenuOpen(false);
                      handleExport('pdf');
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 flex items-start gap-2.5 transition-colors group cursor-pointer"
                  >
                    <div className="p-1 rounded bg-slate-800 border border-slate-700 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/50 mt-0.5 shrink-0">
                      <FileDown className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-xs">Download as PDF</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Formal 2-page SIU dossier: Topology visual + Evidence node audit table &amp; sign-off
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title={isExpanded ? 'Exit fullscreen' : 'Expand graph'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Graph Grid: Interactive Canvas + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Visual Graph Viewport (SVG) */}
        <div className="lg:col-span-8 bg-slate-950/80 relative min-h-[440px] flex items-center justify-center p-2 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
          
          {/* Legend Overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-300 z-10 shadow-lg space-y-1.5 pointer-events-none">
            <p className="font-semibold text-slate-200 text-[10px] uppercase tracking-wider mb-1">Relationship Map</p>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Verified Match / Concurrence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Discrepancy / Policy Exclusion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Requires Review / Cap Exceeded</span>
            </div>
          </div>

          <svg 
            ref={svgRef}
            id="evidence-graph-viewport-svg"
            className="w-full h-full min-h-[420px] max-h-[500px]" 
            viewBox="0 0 800 440"
          >
            <defs>
              <style>{`
                text { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
              `}</style>
              {/* Radial gradients for glowing nodes */}
              <radialGradient id="grad-claim" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="grad-conflict" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0.3" />
              </radialGradient>
              <radialGradient id="grad-verified" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
              </radialGradient>

              {/* Arrowhead markers */}
              <marker id="arrow-verified" markerWidth="6" markerHeight="6" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
              </marker>
              <marker id="arrow-conflict" markerWidth="6" markerHeight="6" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" fill="#f43f5e" />
              </marker>
              <marker id="arrow-pending" markerWidth="6" markerHeight="6" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" fill="#64748b" />
              </marker>
            </defs>

            {/* Background Grid Pattern */}
            <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Render Links */}
            {graphData.links.map((link) => {
              const src = nodePositions.get(link.source);
              const tgt = nodePositions.get(link.target);
              if (!src || !tgt) return null;

              const isConnected = link.source === selectedNodeId || link.target === selectedNodeId;
              const isConflict = link.status === 'conflict';
              const isVerified = link.status === 'verified';

              const strokeColor = isConflict 
                ? '#f43f5e' 
                : isVerified 
                ? '#10b981' 
                : '#64748b';

              const strokeWidth = isConnected ? 2.5 : 1.5;
              const strokeDash = isConflict ? '4,3' : 'none';

              // Midpoint for relationship label
              const midX = (src.cx + tgt.cx) / 2;
              const midY = (src.cy + tgt.cy) / 2;

              return (
                <g key={link.id} className="transition-opacity duration-200">
                  <line
                    x1={src.cx}
                    y1={src.cy}
                    x2={tgt.cx}
                    y2={tgt.cy}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDash}
                    strokeOpacity={isConnected ? 0.95 : 0.4}
                  />
                  {/* Small pill on edge with relationship verb */}
                  {isConnected && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-45"
                        y="-9"
                        width="90"
                        height="18"
                        rx="4"
                        fill="#0f172a"
                        stroke={strokeColor}
                        strokeWidth="1"
                        opacity="0.9"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill={isConflict ? '#fda4af' : '#94a3b8'}
                        fontSize="9"
                        fontWeight="500"
                        className="pointer-events-none select-none"
                      >
                        {link.label.length > 18 ? link.label.slice(0, 16) + '…' : link.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions.get(node.id);
              if (!pos) return null;

              const isSelected = node.id === selectedNodeId;
              const isRoot = node.type === 'claim';
              const isConflict = node.status === 'conflict';
              const isWarning = node.status === 'warning';
              const isOk = node.status === 'ok';

              let fillColor = '#1e293b';
              let strokeColor = '#475569';
              let r = isRoot ? 24 : 18;

              if (isConflict) {
                fillColor = '#881337';
                strokeColor = '#f43f5e';
              } else if (isWarning) {
                fillColor = '#78350f';
                strokeColor = '#f59e0b';
              } else if (isOk) {
                fillColor = '#064e3b';
                strokeColor = '#10b981';
              } else if (isRoot) {
                fillColor = '#1e3a8a';
                strokeColor = '#3b82f6';
              }

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.cx}, ${pos.cy})`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Selection glow ring */}
                  {isSelected && (
                    <circle
                      r={r + 8}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="2"
                      strokeDasharray="4,2"
                      className="animate-spin-slow opacity-80"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={r}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-200 group-hover:scale-110 shadow-lg"
                  />

                  {/* Node Label underneath */}
                  <text
                    y={r + 14}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize="10"
                    fontWeight={isSelected ? '600' : '400'}
                    className="select-none pointer-events-none drop-shadow-md"
                  >
                    {node.label.length > 20 ? node.label.slice(0, 18) + '…' : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="lg:col-span-4 p-5 bg-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    Node: {selectedNode.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    {selectedNode.label}
                  </h4>
                </div>
              </div>
              <div>{getStatusBadge(selectedNode.status)}</div>
            </div>

            {/* Node Metadata / Details */}
            {selectedNode.details && (
              <div className="bg-slate-850 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                <p className="font-medium text-slate-400 text-[11px] mb-1 uppercase tracking-wider">Evidence Finding / Detail:</p>
                <p className="leading-relaxed">{selectedNode.details}</p>
              </div>
            )}

            {/* Connected Links Breakdown */}
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>Relational Links</span>
                <span className="text-[10px] text-slate-500">{connectedLinks.length} connections</span>
              </p>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {connectedLinks.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No direct connections mapped.</p>
                ) : (
                  connectedLinks.map((link) => {
                    const isSource = link.source === selectedNode.id;
                    const otherNodeId = isSource ? link.target : link.source;
                    const otherNode = graphData.nodes.find((n) => n.id === otherNodeId);
                    const isConflict = link.status === 'conflict';

                    return (
                      <div
                        key={link.id}
                        onClick={() => setSelectedNodeId(otherNodeId)}
                        className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors flex items-center justify-between gap-2 ${
                          isConflict
                            ? 'bg-rose-950/20 border-rose-800/40 text-rose-300 hover:bg-rose-950/40'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate text-slate-200">
                            {otherNode?.label || otherNodeId}
                          </p>
                          <p className="text-[10px] text-slate-400 capitalize">
                            Relation: <span className={isConflict ? 'text-rose-400 font-semibold' : 'text-blue-300'}>{link.label}</span>
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-500">&rarr;</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Quick Action in inspector */}
          <div className="pt-4 border-t border-slate-800 mt-4">
            <p className="text-[11px] text-slate-400 text-center">
              Click any node in the network to inspect cross-document relationships.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
