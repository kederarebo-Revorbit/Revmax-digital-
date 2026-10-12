import { 
  Building2, 
  Target, 
  Award, 
  Globe2, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle,
  Briefcase
} from 'lucide-react';

interface AboutSectionProps {
  onOpenAuditModal?: (title?: string) => void;
}

export default function AboutSection({ onOpenAuditModal }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Company Overview · Commercial Intelligence Pioneers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            About RevMax Digital Hospitality
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Revenue. Distribution. Intelligence. Growth. We are Ethiopia and East Africa's dedicated hotel commercial strategy firm, combining asset-level consulting with live market data, benchmarking, and predictive revenue tools.
          </p>
        </div>

        {/* 2-Column Split: Story & Architectural Luxury Exterior (No Human Faces) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl font-bold text-slate-900">
              Bridging Global Revenue Technology with East African Market Realities
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike traditional creative marketing agencies that deliver vanity metrics, RevMax was founded by seasoned hotel revenue directors and hospitality technologists who understand the complex commercial dynamics of African gateway markets.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              From managing foreign exchange rate float dynamics and diplomatic compression seasons (like the African Union Summit and UNECA sessions) to optimizing global OTAs (Booking.com, Expedia, Agoda, and Trip.com), we transform how properties price, distribute, and sell their inventory.
            </p>

            <div className="space-y-3 pt-3">
              {[
                { title: 'Data-Driven, Not Intuition-Based', desc: 'Every price point is backed by pick-up pace models, flight arrivals, and competitor rate shopping.' },
                { title: 'Aligned with Ownership Goals', desc: 'We measure success in TrevPAR, RevPAR index growth, and bottom-line Gross Operating Profit (GOP).' },
                { title: 'Turnkey Technology Stack', desc: 'Direct integration with your PMS, channel manager, metasearch engines, and QR digital menus.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#1E6BFF] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => onOpenAuditModal?.('Executive Commercial Consultation')}
                className="px-6 py-3 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors shadow-md cursor-pointer"
              >
                Schedule an Executive Consultation
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="/src/assets/images/skylight_resort_exterior_1791791134089.jpg"
                onError={(e) => {
                  // Fallback to luxury hotel exterior without faces
                  (e.target as HTMLImageElement).src = '/src/assets/images/skylight_resort_exterior_1791789009906.jpg';
                }}
                alt="Luxury Hotel & Resort Architecture in East Africa"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="text-sm font-bold text-white">Commercial Leadership & Asset Advisory</div>
                <div className="text-xs text-[#00D2FF] mt-0.5">Advising 4-Star & 5-Star Hotel Owners Across Ethiopia</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
          {[
            {
              icon: TrendingUp,
              title: 'Revenue Science',
              desc: 'Dynamic rate fences, MLOS restrictions, day-of-week pricing, and predictive demand modeling.'
            },
            {
              icon: Globe2,
              title: 'Global Distribution',
              desc: 'Rate parity enforcement across Booking.com, Expedia, and China-facing Trip.com channels.'
            },
            {
              icon: Building2,
              title: 'Asset Growth',
              desc: 'Owner-aligned commercial consulting designed to elevate asset appraisal and loan servicing ratios.'
            },
            {
              icon: Target,
              title: 'Digital Flagships',
              desc: 'Conversion-engineered direct booking engines that systematically lower third-party OTA commissions.'
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E6BFF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
