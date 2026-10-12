import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Compass, 
  BarChart3, 
  DollarSign, 
  Sparkles, 
  ChevronRight,
  Flame,
  Search,
  Building2,
  Check
} from 'lucide-react';
import { ADDIS_MARKET_SNAPSHOT, MONITORED_HOTELS } from '../data/hospitalityData';

interface HomeHeroProps {
  onBookConsultation: () => void;
  onExploreIntelligence: () => void;
  onOpenCompSetScanner?: () => void;
  onSelectHotelInSearch?: (hotelName: string) => void;
}

export default function HomeHero({
  onBookConsultation,
  onExploreIntelligence,
  onOpenCompSetScanner,
  onSelectHotelInSearch
}: HomeHeroProps) {
  // Animated ticker for live hotel metrics
  const [tickerOcc, setTickerOcc] = useState<number>(64.2);
  const [tickerAdr, setTickerAdr] = useState<number>(128.5);

  // Selected hotel in hero comp-set widget
  const [selectedHeroHotel, setSelectedHeroHotel] = useState(MONITORED_HOTELS[0]);
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerOcc((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const filteredHeroHotels = MONITORED_HOTELS.filter((h) =>
    h.name.toLowerCase().includes(heroSearchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(heroSearchQuery.toLowerCase())
  );

  return (
    <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white border-b border-slate-200">
      
      {/* Background Decorative Lighting Gradients (Royal Blue & Cyan based on RevMax Logo) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-40">
        <div className="absolute top-[-160px] left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#1E6BFF]/20 to-[#00D2FF]/25 blur-[140px]" />
        <div className="absolute top-[120px] right-1/4 w-[450px] h-[450px] rounded-full bg-blue-100/60 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Split: Value Proposition + Live Interactive Executive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Clean Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono font-medium">
              <span className="text-[#1E6BFF] font-bold tracking-wider uppercase">REVMAX COMMERCIAL STRATEGY</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Horn of Africa & East Africa</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Pacing Active
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] [text-wrap:balance]">
              Unlock Your Hotel's <span className="revmax-gradient-text">Revenue Potential</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Transform hotel performance through Revenue Management, Distribution Strategy, Digital Marketing, Market Intelligence, and Hospitality Technology Solutions.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onBookConsultation}
                className="px-6 py-3.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white font-bold text-sm transition-all shadow-lg shadow-[#1E6BFF]/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Consultation</span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreIntelligence}
                className="px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <BarChart3 className="w-4 h-4 text-[#1E6BFF]" />
                <span>Explore Market Intelligence</span>
              </button>
            </div>

            {/* Motion Graphic Radar Quick Trigger Banner */}
            <div className="pt-2">
              <button
                onClick={onOpenCompSetScanner}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-white border border-blue-200 hover:border-[#1E6BFF] text-xs text-slate-700 hover:text-slate-900 transition-all flex items-center gap-3 text-left cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1E6BFF] to-[#00D2FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#1E6BFF]/30 relative">
                  <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1E6BFF] font-bold text-xs">Live 360° Comp-Set Radar Scanner</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-100 text-[#1E6BFF] font-semibold">Motion Active</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Omni-directional rate tracking across 32+ Addis Ababa properties</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#1E6BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>

            {/* Quantitative Proof Metrics Strip with Motion Polish */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
              <div className="group">
                <div className="text-2xl font-extrabold font-mono text-[#1E6BFF] flex items-center gap-1">
                  <span>+28.4%</span>
                  <span className="text-xs text-emerald-500 font-sans font-bold">▲</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Average RevPAR Lift</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">9,850+</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Keys Benchmarked</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-emerald-600">99.4%</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Rate Parity Integrity</div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Executive Hospitality Intelligence Console */}
          <div className="lg:col-span-6 relative">
            
            {/* Motion Graphic Floating Telemetry Pill 1 (Top Left) */}
            <div className="absolute -top-4 -left-3 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200 shadow-xl text-xs font-mono font-bold text-slate-800 animate-float-slow">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[#1E6BFF]">REVPAR INDEX: 128.4</span>
              <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">+28.4%</span>
            </div>

            {/* Motion Graphic Floating Telemetry Pill 2 (Bottom Right) */}
            <div className="absolute -bottom-4 -right-3 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl text-xs font-mono text-white animate-float-reverse">
              <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
              <span>PARITY SHIELD: 99.4% IN TACT</span>
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
            </div>

            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white tracking-wide">
                    ADDIS ABABA HOSPITALITY INTELLIGENCE DESK
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#00D2FF] bg-[#1E6BFF]/20 px-2 py-0.5 rounded border border-[#00D2FF]/30">
                  LIVE BENCHMARK
                </span>
              </div>

              {/* Architectural Image Carrier (No People / No Direct Faces) */}
              <div className="my-5 relative rounded-2xl overflow-hidden border border-white/10 h-44 sm:h-52">
                <img
                  src="/src/assets/images/boardroom_analytics_screens_1791791134089.jpg"
                  alt="Modern Hotel Executive Analytics Control Center"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between text-xs text-white">
                    <div>
                      <span className="font-bold text-[#00D2FF]">Addis Gateway Monitor: </span>
                      <span>Bole Corridor & African Union Diplomatic Zone</span>
                    </div>
                    <span className="font-mono text-xs text-amber-300">Peak Season</span>
                  </div>
                </div>
              </div>

              {/* 3 Real-time Live Market Indicators */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[11px] text-slate-400">Current Market ADR</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    ${tickerAdr}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">+12.4% YoY</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[11px] text-slate-400">City Occupancy</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {tickerOcc}%
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">High Season</div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="text-[11px] text-slate-400">Market RevPAR</div>
                  <div className="text-xl font-bold font-mono text-[#00D2FF] mt-1">
                    ${(tickerAdr * (tickerOcc / 100)).toFixed(1)}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">Top-Line Yield</div>
                </div>
              </div>

              {/* Live Interactive Comp-Set Rates Tonight with Hotel Search Button */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Live Comp-Set Rates Tonight</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
                </div>

                {/* Hotel Search & Quick Selector */}
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search your hotel (e.g. Skylight, Hyatt, Sheraton, Radisson)..."
                        value={heroSearchQuery}
                        onFocus={() => setIsDropdownOpen(true)}
                        onChange={(e) => {
                          setHeroSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        className="w-full bg-slate-800/90 border border-white/15 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D2FF]"
                      />
                    </div>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="px-3 py-2 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                    >
                      {isDropdownOpen ? 'Close' : 'Select Hotel'}
                    </button>
                  </div>

                  {/* Dropdown Results */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/20 rounded-xl shadow-2xl max-h-48 overflow-y-auto z-30 p-1.5 space-y-1">
                      {filteredHeroHotels.slice(0, 6).map((h) => (
                        <button
                          key={h.id}
                          onClick={() => {
                            setSelectedHeroHotel(h);
                            setHeroSearchQuery('');
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            selectedHeroHotel.id === h.id ? 'bg-[#1E6BFF] text-white' : 'hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-white">{h.name}</div>
                            <div className="text-[10px] text-slate-400">{h.location}</div>
                          </div>
                          <span className="font-mono font-bold">${h.tonightRateUSD}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Hotel Rate Card */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{selectedHeroHotel.name}</span>
                      <span className="text-[10px] text-amber-400">{'★'.repeat(selectedHeroHotel.stars)}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Tomorrow: <strong className="text-white">${selectedHeroHotel.tomorrowRateUSD}</strong> · Parity: <span className="text-emerald-400 font-semibold">{selectedHeroHotel.otaRateParity}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-xl font-bold text-[#00D2FF]">
                      ${selectedHeroHotel.tonightRateUSD} <span className="text-[10px] font-normal text-slate-400">USD</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                      {selectedHeroHotel.recommendation}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Currency Reference: 1 USD = 142.50 ETB</span>
                <span className="text-[#00D2FF] font-semibold">98.2% Forecast Precision</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
