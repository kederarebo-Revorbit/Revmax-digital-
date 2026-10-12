import { NavigationTab } from '../types';
import RevMaxLogo from './RevMaxLogo';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAuditModal: () => void;
}

export default function Footer({ onSelectTab, onOpenAuditModal }: FooterProps) {
  return (
    <footer className="bg-[#030712] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center text-left cursor-pointer focus:outline-none"
              aria-label="RevMax Home"
            >
              <RevMaxLogo className="h-11" />
            </button>
            <div className="text-xs font-mono font-bold text-[#00D2FF]">
              Revenue. Distribution. Intelligence. Growth.
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Hotel commercial strategy, rate intelligence, and distribution architecture for hotels, resorts, safari lodges, and serviced apartments across Addis Ababa, Ethiopia, and East Africa.
            </p>
            <div className="text-[11px] text-slate-500">
              Bole Road (Africa Avenue), Olympic Building, 6th Floor · Addis Ababa, Ethiopia
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Solutions</div>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">Revenue Management</button></li>
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">Distribution Strategy</button></li>
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">OTA Rate Parity Audits</button></li>
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">Reputation Management</button></li>
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">Direct Booking Engines</button></li>
              <li><button onClick={() => onSelectTab('solutions')} className="hover:text-white transition-colors cursor-pointer">QR Digital Menu Systems</button></li>
            </ul>
          </div>

          {/* Intelligence & Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Intelligence & Tools</div>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectTab('intelligence')} className="hover:text-white transition-colors cursor-pointer">Market Intelligence Desk</button></li>
              <li><button onClick={() => onSelectTab('rate-intelligence')} className="hover:text-white transition-colors cursor-pointer">Google Hotels Rate Shopper</button></li>
              <li><button onClick={() => onSelectTab('comparison')} className="hover:text-white transition-colors cursor-pointer text-[#00D2FF]">Comp-Set Comparison</button></li>
              <li><button onClick={() => onSelectTab('parity')} className="hover:text-white transition-colors cursor-pointer text-[#00D2FF]">OTA Rate Parity Monitor</button></li>
              <li><button onClick={() => onSelectTab('tools')} className="hover:text-white transition-colors cursor-pointer">6 Interactive Revenue Tools</button></li>
              <li><button onClick={() => onSelectTab('events')} className="hover:text-white transition-colors cursor-pointer">AU & MICE Events Calendar</button></li>
              <li><button onClick={() => onSelectTab('benchmark')} className="hover:text-white transition-colors cursor-pointer">Hotel Benchmark Calculator</button></li>
            </ul>
          </div>

          {/* Resources & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Resources & Desk</div>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectTab('resources')} className="hover:text-white transition-colors cursor-pointer">Downloadable KPI Models</button></li>
              <li><button onClick={() => onSelectTab('resources')} className="hover:text-white transition-colors cursor-pointer">30-60-90 Day Forecasting</button></li>
              <li><button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors cursor-pointer">About RevMax Advisory</button></li>
              <li><button onClick={() => onSelectTab('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Commercial Desk</button></li>
              <li><button onClick={onOpenAuditModal} className="text-[#D4AF37] hover:underline cursor-pointer">Book Free Revenue Audit</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} RevMax Digital Hospitality LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Addis Ababa · Nairobi · Kigali</span>
            <span>Commercial Confidentiality Guaranteed</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
