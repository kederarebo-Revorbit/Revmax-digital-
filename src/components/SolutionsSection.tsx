import { useState } from 'react';
import { 
  TrendingUp, 
  Share2, 
  Star, 
  Megaphone, 
  Globe, 
  QrCode, 
  Check, 
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/hospitalityData';

interface SolutionsSectionProps {
  onOpenAuditModal?: (serviceTitle?: string) => void;
}

export default function SolutionsSection({ onOpenAuditModal }: SolutionsSectionProps) {
  const solutionIcons: Record<string, any> = {
    'revenue-management': TrendingUp,
    'distribution-management': Share2,
    'marketing-reputation': Star,
    'digital-marketing': Megaphone,
    'website-development': Globe,
    'digital-menu': QrCode,
  };

  return (
    <section id="solutions" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Integrated Commercial Architecture · 6 Core Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Hospitality Commercial Solutions
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            From pricing algorithms and global distribution networks to direct booking engines and contactless F&B menus, RevMax builds end-to-end commercial engines for independent hotels, luxury resorts, and serviced apartments across Africa.
          </p>
        </div>

        {/* Asymmetric Solutions Bento / Grid with White / Slate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.map((sol) => {
            const Icon = solutionIcons[sol.id] || TrendingUp;
            const isFeatured = sol.id === 'revenue-management' || sol.id === 'distribution-management';

            return (
              <div
                key={sol.id}
                className={`bg-white border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all group ${
                  isFeatured
                    ? 'border-blue-300 shadow-md hover:shadow-xl hover:border-[#1E6BFF]'
                    : 'border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#1E6BFF] font-bold tracking-wider">
                      {sol.number}. SERVICE
                    </span>
                    <div className="p-2.5 rounded-xl bg-blue-50 text-[#1E6BFF] group-hover:bg-[#1E6BFF] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-[#1E6BFF] transition-colors">
                    {sol.title}
                  </h3>
                  
                  <div className="text-xs font-semibold text-[#1E6BFF] mt-1.5 mb-3">
                    {sol.tagline}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {sol.description}
                  </p>

                  {/* Services List */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Included Capabilities:
                    </div>
                    {sol.services.map((svc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#1E6BFF] shrink-0 mt-0.5" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Impact Metric & Action */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                    <div className="text-sm font-extrabold font-mono text-[#1E6BFF]">
                      {sol.metric}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                      {sol.subtext}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenAuditModal?.(sol.title)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#1E6BFF] text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Request {sol.title} Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* F&B Digital Menu Showcase Featurette (No direct human faces) */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl overflow-hidden p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold tracking-wider text-[#1E6BFF] uppercase">
                Featured Innovation · Contactless F&B Merchandising
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Digital QR Menus & Fine-Dining Guest Experience
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Elevate average guest spend per cover with high-resolution visual menus, Amharic/English/French translations, dietary filtering, and direct WhatsApp ordering for in-room dining and poolside cabanas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xl font-extrabold font-mono text-emerald-600">+22%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Average Check Size</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xl font-extrabold font-mono text-slate-900">&lt; 1.5s</div>
                  <div className="text-[11px] text-slate-500 font-medium">QR Load Speed</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xl font-extrabold font-mono text-[#1E6BFF]">4 Languages</div>
                  <div className="text-[11px] text-slate-500 font-medium">Instant Translation</div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onOpenAuditModal?.('Digital Menu Solutions')}
                  className="px-5 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
                >
                  Request Live QR Demo
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src="/src/assets/images/luxury_dining_table_setting_1791791145023.jpg"
                alt="Luxury Hotel Fine Dining Table Setting Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-xs text-white">
                  <span className="font-bold text-[#00D2FF]">RevMax Dining Tech: </span>
                  Integrated into luxury hotel lounges and restaurants across Addis Ababa.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
