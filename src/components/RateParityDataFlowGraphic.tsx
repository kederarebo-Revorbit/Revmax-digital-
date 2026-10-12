import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  RotateCw,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';

interface RateParityDataFlowGraphicProps {
  onOpenAuditModal?: (title?: string) => void;
}

export default function RateParityDataFlowGraphic({ onOpenAuditModal }: RateParityDataFlowGraphicProps) {
  const [isSimulatingBreach, setIsSimulatingBreach] = useState<boolean>(true);
  const [roomNightVolume, setRoomNightVolume] = useState<number>(450);
  const [otaCommissionRate, setOtaCommissionRate] = useState<number>(18); // 18%
  const [adrValue, setAdrValue] = useState<number>(135); // $135 ADR

  // Calculations
  const otaLeakagePercentage = isSimulatingBreach ? 0.38 : 0.12; // 38% booking share lost to OTAs during undercut
  const totalOtaBookings = Math.round(roomNightVolume * otaLeakagePercentage);
  const directBookings = roomNightVolume - totalOtaBookings;
  
  const otaRevenue = totalOtaBookings * adrValue;
  const otaCommissionsPaid = Math.round(otaRevenue * (otaCommissionRate / 100));
  const recoverableDirectMargin = Math.round(otaCommissionsPaid * 0.72); // 72% recoverable with RevMax Parity Playbook

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Lighting Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E6BFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#00D2FF] uppercase">
              MOTION GRAPHIC ARCHITECTURE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              DISTRIBUTION PIPELINE
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Rate Flow & OTA Leakage Circuit
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Visualize how rate updates travel from your Hotel PMS through the Channel Manager into Google Hotels Metasearch and OTAs — and where direct revenue bleeds away.
          </p>
        </div>

        {/* Breach Simulation Switch */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setIsSimulatingBreach(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isSimulatingBreach
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strict Parity (Direct Wins)</span>
          </button>

          <button
            onClick={() => setIsSimulatingBreach(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isSimulatingBreach
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate OTA Undercut</span>
          </button>
        </div>
      </div>

      {/* Interactive Motion Graphic SVG Distribution Flow Diagram */}
      <div className="relative z-10 my-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Node 1: Hotel PMS / Master CRS */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md relative group hover:border-[#1E6BFF] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#1E6BFF]/20 text-[#00D2FF] border border-[#1E6BFF]/40 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Step 1: Origin</div>
            <div className="text-base font-bold text-white mt-0.5">Hotel PMS / CRS</div>
            <div className="text-xs text-slate-400 mt-1">Master BAR Rack Rate ($135)</div>
            <div className="mt-3 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Source Rate Broadcast
            </div>
          </div>

          {/* Node 2: Channel Manager */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md relative group hover:border-[#1E6BFF] transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-[#00D2FF] border border-blue-500/40 flex items-center justify-center mb-3">
              <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Step 2: Sync Router</div>
            <div className="text-base font-bold text-white mt-0.5">Channel Manager</div>
            <div className="text-xs text-slate-400 mt-1">Pushes 2-way live availability</div>
            <div className="mt-3 text-[11px] font-mono text-[#00D2FF] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
              Real-time API Dispatch
            </div>
          </div>

          {/* Node 3: Google Hotels Metasearch Hub */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md relative group hover:border-[#00D2FF] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Step 3: Metasearch</div>
            <div className="text-base font-bold text-white mt-0.5">Google Hotels</div>
            <div className="text-xs text-slate-400 mt-1">Side-by-side rates comparison</div>
            <div className="mt-3 text-[11px] font-mono text-blue-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
              Rate Shopper Arbiter
            </div>
          </div>

          {/* Node 4: Destination & Leakage Fork */}
          <div className={`p-5 rounded-2xl border shadow-md relative transition-all ${
            isSimulatingBreach 
              ? 'bg-amber-950/30 border-amber-500/50 shadow-amber-500/10' 
              : 'bg-emerald-950/30 border-emerald-500/50 shadow-emerald-500/10'
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
              isSimulatingBreach 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {isSimulatingBreach ? <AlertTriangle className="w-5 h-5 animate-bounce" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Step 4: Booking Conversion</div>
            <div className="text-base font-bold text-white mt-0.5">
              {isSimulatingBreach ? 'OTA Hijack & Commission Bleed' : '100% Direct Website Win'}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {isSimulatingBreach 
                ? `Booking.com sells at $118 vs Direct $135 (-12% Leak)` 
                : 'Direct Engine matches or beats OTAs with perks'}
            </div>
            <div className={`mt-3 text-[11px] font-mono font-bold flex items-center gap-1 ${
              isSimulatingBreach ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {isSimulatingBreach ? '⚠ 18% Commission Lost to OTA' : '✓ $0 Intermediary Fees'}
            </div>
          </div>

        </div>

        {/* Animated Connecting Data Stream SVG Line Overlay */}
        <div className="hidden md:block my-4 px-8">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 800 24" fill="none">
            <path
              d="M 50 12 L 250 12 L 450 12 L 750 12"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Animated Pulses Moving across the wire */}
            <path
              d="M 50 12 L 250 12 L 450 12 L 750 12"
              stroke={isSimulatingBreach ? '#F59E0B' : '#00D2FF'}
              strokeWidth="3"
              strokeLinecap="round"
              className={isSimulatingBreach ? 'animate-data-stream-fast' : 'animate-data-stream'}
            />
          </svg>
        </div>

      </div>

      {/* Interactive Financial Leakage Simulator Controls */}
      <div className="relative z-10 pt-6 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono text-[#00D2FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Parity Financial Calculator</span>
          </div>

          {/* Slider 1: Monthly Room Nights Sold */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-semibold">Monthly Total Room Nights Sold:</span>
              <span className="font-mono text-[#00D2FF] font-bold text-sm">{roomNightVolume} room nights</span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={roomNightVolume}
              onChange={(e) => setRoomNightVolume(Number(e.target.value))}
              className="w-full accent-[#1E6BFF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>100 (Boutique)</span>
              <span>1,000 (Commercial 4-Star)</span>
              <span>2,000+ (Skylight / Large Chain)</span>
            </div>
          </div>

          {/* Slider 2: Average Daily Rate (ADR) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-semibold">Average Daily Rate (ADR):</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">${adrValue} / night</span>
            </div>
            <input
              type="range"
              min="60"
              max="350"
              step="5"
              value={adrValue}
              onChange={(e) => setAdrValue(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$60 (Economy)</span>
              <span>$140 (Addis Corporate)</span>
              <span>$350+ (Luxury Presidential)</span>
            </div>
          </div>
        </div>

        {/* Results Live Animated Output Card */}
        <div className="lg:col-span-5">
          <div className={`p-6 rounded-2xl border transition-all ${
            isSimulatingBreach 
              ? 'bg-gradient-to-br from-slate-950 to-amber-950/20 border-amber-500/40 shadow-xl' 
              : 'bg-gradient-to-br from-slate-950 to-blue-950/30 border-[#1E6BFF]/50 shadow-xl'
          }`}>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {isSimulatingBreach ? 'MONTHLY COMMISSION EXPENSE ON OTAS' : 'DIRECT PROFIT PRESERVED'}
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold font-mono mt-2 flex items-baseline gap-2">
              <span className={isSimulatingBreach ? 'text-amber-400' : 'text-emerald-400'}>
                ${otaCommissionsPaid.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-sans font-normal">/ month in fees</span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isSimulatingBreach ? (
                <span>
                  When OTAs undercut your direct website, an estimated <strong className="text-amber-300">{totalOtaBookings} bookings</strong> slip through third-party channels, burning <strong>${otaCommissionsPaid.toLocaleString()}</strong> every month.
                </span>
              ) : (
                <span>
                  With strict rate parity and direct value-adds, your property retains <strong className="text-emerald-400">{directBookings} bookings direct</strong>, eliminating third-party deductions.
                </span>
              )}
            </p>

            {/* Recoverable Direct Revenue Value */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">RevMax Direct Reclaim</div>
                <div className="text-sm font-bold text-[#00D2FF] font-mono">
                  +${recoverableDirectMargin.toLocaleString()} / mo
                </div>
              </div>
              <button
                onClick={() => onOpenAuditModal?.(`Parity Recovery Audit ($${recoverableDirectMargin.toLocaleString()}/mo potential)`)}
                className="px-3.5 py-1.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#1E6BFF]/30 flex items-center gap-1"
              >
                <span>Reclaim Margin</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
