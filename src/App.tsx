import { useState } from 'react';
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import SolutionsSection from './components/SolutionsSection';
import MarketIntelligence from './components/MarketIntelligence';
import RateIntelligence from './components/RateIntelligence';
import CompSetComparison from './components/CompSetComparison';
import CompSetRadarScanner from './components/CompSetRadarScanner';
import RateParitySection from './components/RateParitySection';
import RateParityDataFlowGraphic from './components/RateParityDataFlowGraphic';
import RevenueTools from './components/RevenueTools';
import EventsCalendar from './components/EventsCalendar';
import BenchmarkTool from './components/BenchmarkTool';
import ResourceCenter from './components/ResourceCenter';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';
import StickyWhatsApp from './components/StickyWhatsApp';
import { NavigationTab } from './types';
import { Radio, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [auditModalTitle, setAuditModalTitle] = useState<string>('Book a Free Hotel Revenue Audit');
  const [selectedHotelForTools, setSelectedHotelForTools] = useState<string>('skylight');

  // Open audit modal with custom title
  const handleOpenAuditModal = (title?: string) => {
    setAuditModalTitle(title ? `Request ${title}` : 'Book a Free Hotel Revenue Audit');
    setIsAuditModalOpen(true);
  };

  // Scroll to top when changing tab
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate directly to comparison for a specific hotel
  const handleNavigateToComparison = (hotelId: string) => {
    setSelectedHotelForTools(hotelId);
    setCurrentTab('comparison');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate directly to parity for a specific hotel
  const handleNavigateToParity = (hotelId: string) => {
    setSelectedHotelForTools(hotelId);
    setCurrentTab('parity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#1E6BFF]/20 selection:text-[#1E6BFF]">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenAuditModal={() => handleOpenAuditModal()}
        onOpenRadar={() => handleSelectTab('comparison')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <HomeHero
              onBookConsultation={() => handleOpenAuditModal('Executive Commercial Consultation')}
              onExploreIntelligence={() => handleSelectTab('intelligence')}
              onOpenCompSetScanner={() => handleSelectTab('comparison')}
            />

            {/* Motion Graphic: Comp-Set 360 Radar Scanner Section */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <CompSetRadarScanner
                  onSelectHotel={(id) => setSelectedHotelForTools(id)}
                  onNavigateToComparison={handleNavigateToComparison}
                  onNavigateToParity={handleNavigateToParity}
                  onOpenAuditModal={(title) => handleOpenAuditModal(title)}
                />
              </div>
            </section>

            <MarketIntelligence onOpenAuditModal={() => handleOpenAuditModal('Addis Market Report')} />
            
            <RateIntelligence 
              onOpenAuditModal={() => handleOpenAuditModal('Comp-Set Rate Shopper Setup')}
              onNavigateToComparison={handleNavigateToComparison}
              onNavigateToParity={handleNavigateToParity}
            />

            <CompSetComparison 
              onOpenAuditModal={(title) => handleOpenAuditModal(title)} 
              defaultHotelId={selectedHotelForTools}
            />

            <RateParitySection 
              onOpenAuditModal={(title) => handleOpenAuditModal(title)} 
              selectedHotelId={selectedHotelForTools}
            />

            {/* Motion Graphic: Rate Flow & Distribution Circuit */}
            <section className="py-16 bg-slate-950 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RateParityDataFlowGraphic
                  onOpenAuditModal={(title) => handleOpenAuditModal(title)}
                />
              </div>
            </section>

            <RevenueTools onOpenAuditModal={() => handleOpenAuditModal('Yield Model Audit')} />
            
            <EventsCalendar
              onOpenAuditModal={(title) => handleOpenAuditModal(title || 'Event Compression Strategy')}
            />

            <BenchmarkTool onOpenAuditModal={() => handleOpenAuditModal('Comprehensive Property Benchmark')} />
            <SolutionsSection onOpenAuditModal={(service) => handleOpenAuditModal(service)} />
            <ResourceCenter onOpenAuditModal={() => handleOpenAuditModal('Custom Spreadsheet Modeling')} />
            <AboutSection onOpenAuditModal={() => handleOpenAuditModal('Executive Consultation')} />
            <ContactSection />
          </>
        )}

        {currentTab === 'solutions' && (
          <div className="pt-24">
            <SolutionsSection onOpenAuditModal={(service) => handleOpenAuditModal(service)} />
          </div>
        )}

        {currentTab === 'intelligence' && (
          <div className="pt-24 space-y-12">
            <MarketIntelligence onOpenAuditModal={() => handleOpenAuditModal('Market Intelligence Deep Dive')} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CompSetRadarScanner
                onSelectHotel={(id) => setSelectedHotelForTools(id)}
                onNavigateToComparison={handleNavigateToComparison}
                onNavigateToParity={handleNavigateToParity}
                onOpenAuditModal={(title) => handleOpenAuditModal(title)}
              />
            </div>
            <RateIntelligence 
              onOpenAuditModal={() => handleOpenAuditModal('Google Hotels Comp-Set Rate Shopper')}
              onNavigateToComparison={handleNavigateToComparison}
              onNavigateToParity={handleNavigateToParity}
            />
          </div>
        )}

        {currentTab === 'rate-intelligence' && (
          <div className="pt-24">
            <RateIntelligence 
              onOpenAuditModal={() => handleOpenAuditModal('Google Hotels Comp-Set Rate Shopper')}
              onNavigateToComparison={handleNavigateToComparison}
              onNavigateToParity={handleNavigateToParity}
            />
          </div>
        )}

        {currentTab === 'comparison' && (
          <div className="pt-24 space-y-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <CompSetRadarScanner
                onSelectHotel={(id) => setSelectedHotelForTools(id)}
                onNavigateToComparison={handleNavigateToComparison}
                onNavigateToParity={handleNavigateToParity}
                onOpenAuditModal={(title) => handleOpenAuditModal(title)}
              />
            </div>
            <CompSetComparison 
              onOpenAuditModal={(title) => handleOpenAuditModal(title)} 
              defaultHotelId={selectedHotelForTools}
            />
          </div>
        )}

        {currentTab === 'parity' && (
          <div className="pt-24 space-y-12">
            <RateParitySection 
              onOpenAuditModal={(title) => handleOpenAuditModal(title)} 
              selectedHotelId={selectedHotelForTools}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <RateParityDataFlowGraphic
                onOpenAuditModal={(title) => handleOpenAuditModal(title)}
              />
            </div>
          </div>
        )}

        {currentTab === 'tools' && (
          <div className="pt-24">
            <RevenueTools onOpenAuditModal={() => handleOpenAuditModal('Operational Yield Diagnostics')} />
          </div>
        )}

        {currentTab === 'events' && (
          <div className="pt-24">
            <EventsCalendar
              onOpenAuditModal={(title) => handleOpenAuditModal(title || 'Event Compression Strategy')}
            />
          </div>
        )}

        {currentTab === 'benchmark' && (
          <div className="pt-24">
            <BenchmarkTool onOpenAuditModal={() => handleOpenAuditModal('Property Performance Benchmark')} />
          </div>
        )}

        {currentTab === 'resources' && (
          <div className="pt-24">
            <ResourceCenter onOpenAuditModal={() => handleOpenAuditModal('Resource & Financial Modeling')} />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="pt-24">
            <AboutSection onOpenAuditModal={() => handleOpenAuditModal('Consulting Discovery Call')} />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-24">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenAuditModal={() => handleOpenAuditModal()}
      />

      {/* Floating Sticky WhatsApp Button */}
      <StickyWhatsApp />

      {/* Floating Motion Graphic Radar Trigger Pill (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => handleSelectTab('comparison')}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 hover:bg-[#1E6BFF] text-white border border-slate-800 hover:border-[#00D2FF] shadow-2xl transition-all transform hover:scale-105 cursor-pointer group"
          aria-label="Open Comp-Set Radar Scanner"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D2FF]" />
          </span>
          <span className="text-xs font-bold font-mono tracking-wide hidden sm:inline-block">
            360° Comp-Set Radar
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            Live
          </span>
        </button>
      </div>

      {/* Lead Generation Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        defaultTitle={auditModalTitle}
      />

    </div>
  );
}
