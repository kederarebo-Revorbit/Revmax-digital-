import { useState } from 'react';
import { Radio, Menu, X, ArrowUpRight } from 'lucide-react';
import { NavigationTab } from '../types';
import RevMaxLogo from './RevMaxLogo';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenAuditModal: () => void;
  onOpenRadar?: () => void;
}

export default function Navbar({
  currentTab,
  onSelectTab,
  onOpenAuditModal,
  onOpenRadar
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'intelligence', label: 'Market Intelligence' },
    { id: 'rate-intelligence', label: 'Google Hotels' },
    { id: 'comparison', label: 'Comp-Set' },
    { id: 'parity', label: 'Rate Parity' },
    { id: 'tools', label: 'Revenue Tools' },
    { id: 'events', label: 'Events' },
    { id: 'benchmark', label: 'Benchmark' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand logo matching uploaded brand identity (Top Bar Contract) */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center shrink-0 cursor-pointer focus:outline-none"
            aria-label="RevMax Digital Hospitality Home"
          >
            <RevMaxLogo className="h-10 sm:h-11" />
          </button>

          {/* Zone 2: Navigation Links (single line, whitespace-nowrap shrink-0) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer ${
                  currentTab === item.id
                    ? 'text-[#1E6BFF] font-bold border-b-2 border-[#1E6BFF]'
                    : 'text-slate-600 hover:text-[#1E6BFF]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenRadar ? onOpenRadar() : onSelectTab('comparison')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-[#1E6BFF] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm group"
            >
              <Radio className="w-3.5 h-3.5 text-[#00D2FF] group-hover:animate-pulse" />
              <span>Comp-Set Radar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>

            <button
              onClick={onOpenAuditModal}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1E6BFF] hover:bg-[#1557D6] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-[#1E6BFF]/20"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenRadar ? onOpenRadar() : onSelectTab('comparison')}
              className="p-2 rounded-xl bg-slate-900 text-white text-xs cursor-pointer flex items-center gap-1"
            >
              <Radio className="w-4 h-4 text-[#00D2FF]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  currentTab === item.id
                    ? 'bg-blue-50 text-[#1E6BFF]'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuditModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#1E6BFF] rounded-xl shadow-md"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
