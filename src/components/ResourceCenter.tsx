import { useState } from 'react';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Table, 
  SlidersHorizontal, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { RESOURCES_LIST } from '../data/hospitalityData';
import { ResourceItem } from '../types';

interface ResourceCenterProps {
  onOpenAuditModal?: () => void;
}

export default function ResourceCenter({ onOpenAuditModal }: ResourceCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = [
    'All',
    'Revenue Management',
    'Distribution',
    'Marketing',
    'Technology',
    'Market Reports',
    'Hospitality Trends',
  ];

  const filteredResources = RESOURCES_LIST.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleDownload = (resource: ResourceItem) => {
    const content = `REVMAX DIGITAL HOSPITALITY — ${resource.title.toUpperCase()}
Category: ${resource.category}
Format: ${resource.format}
Generated for: Hotel Commercial Strategy Team

[SUMMARY]
${resource.description}

[METRIC FRAMEWORK]
1. RevPAR = Total Room Revenue / Total Available Rooms
2. ADR = Room Revenue / Rooms Sold
3. Occupancy% = (Rooms Sold / Available Rooms) * 100
4. Net RevPAR = (Gross Room Revenue - OTA Commissions) / Total Available Rooms
5. Compression Multiplier = Peak Demand ADR / Baseline Rack ADR

RevMax Digital Hospitality | Bole Road, Addis Ababa, Ethiopia
Website: https://revmaxhospitality.com | Commercial Desk: +251 911 000 000
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.id}_RevMax_Commercial_Template.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage(`Downloaded "${resource.title}" successfully.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  return (
    <section id="resources" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Knowledge Vault · Downloadable Models & Whitepapers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospitality Intelligence & Resource Center
          </h2>
          <p className="mt-2 text-slate-600 text-base leading-relaxed">
            Access free operational revenue models, daily pick-up pace templates, rate parity checklists, and market research published by RevMax strategy specialists.
          </p>
        </div>

        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl overflow-x-auto mb-10 scrollbar-none">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1E6BFF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Success toast */}
        {downloadSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccessMessage}</span>
            </div>
            <button onClick={() => setDownloadSuccessMessage(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-[#1E6BFF] font-bold">{resource.category}</span>
                  <span className="font-mono text-slate-500 font-medium">{resource.format}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E6BFF] transition-colors leading-snug">
                  {resource.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {resource.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  {resource.readTime}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  onClick={() => setPreviewResource(resource)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#1E6BFF]" />
                  <span>Quick Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(resource)}
                  className="py-2 px-3.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Need a Bespoke Financial Model for Your Hotel?</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Our revenue strategists build custom PMS extraction spreadsheets, automated pick-up calculators, and owner-facing board reporting decks.
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="px-5 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold whitespace-nowrap transition-colors shadow-md cursor-pointer"
          >
            Request Custom Template
          </button>
        </div>

      </div>

      {/* Quick Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setPreviewResource(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-[#1E6BFF] uppercase tracking-wider mb-1 font-bold">
              {previewResource.category} · {previewResource.format}
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {previewResource.title}
            </h3>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {previewResource.description}
            </p>

            <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Template Highlights:</div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Pre-configured formulas for RevPAR, ADR, GOPPAR, and Occupancy</li>
                <li>Pacing curve comparison for AU Summit and UNECA conference dates</li>
                <li>Channel commission deduction logic for Booking.com & Trip.com</li>
                <li>Direct vs OTA contribution margin tracking</li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="flex-1 py-2.5 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Free Resource</span>
              </button>
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
