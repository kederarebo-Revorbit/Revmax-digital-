import React, { useState } from 'react';
import { 
  Radio, 
  Layers, 
  ArrowRight, 
  Eye, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { MONITORED_HOTELS } from '../data/hospitalityData';

interface CompSetRadarScannerProps {
  onSelectHotel?: (hotelId: string) => void;
  onNavigateToComparison?: (hotelId: string) => void;
  onNavigateToParity?: (hotelId: string) => void;
  onOpenAuditModal?: (title?: string) => void;
}

export default function CompSetRadarScanner({
  onSelectHotel,
  onNavigateToComparison,
  onNavigateToParity,
  onOpenAuditModal
}: CompSetRadarScannerProps) {
  const [filterSubmarket, setFilterSubmarket] = useState<string>('all');
  const [activeBlipId, setActiveBlipId] = useState<string>('skylight');
  const [isSweepActive, setIsSweepActive] = useState<boolean>(true);
  const [sweepSpeed, setSweepSpeed] = useState<'normal' | 'fast'>('normal');

  // Select key representative hotels for polar coordinates on radar display
  const radarHotels = [
    { id: 'skylight', angle: 45, radius: 45, status: 'parity', signal: 98 },
    { id: 'sheraton', angle: 120, radius: 72, status: 'warning', signal: 92 },
    { id: 'hyatt', angle: 210, radius: 60, status: 'parity', signal: 96 },
    { id: 'radisson', angle: 280, radius: 50, status: 'parity', signal: 94 },
    { id: 'marriott', angle: 330, radius: 35, status: 'parity', signal: 97 },
    { id: 'hilton', angle: 80, radius: 82, status: 'parity', signal: 89 },
    { id: 'golden-tulip', angle: 165, radius: 68, status: 'parity', signal: 91 },
    { id: 'grandpalace', angle: 245, radius: 78, status: 'warning', signal: 93 },
    { id: 'capital', angle: 195, radius: 88, status: 'parity', signal: 88 },
    { id: 'kuriftubishoftu', angle: 305, radius: 92, status: 'advantage', signal: 95 },
  ];

  // Lookup hotel data
  const blipHotels = radarHotels.map(blip => {
    const data = MONITORED_HOTELS.find(h => h.id === blip.id);
    return {
      ...blip,
      data: data || MONITORED_HOTELS[0]
    };
  }).filter(item => {
    if (filterSubmarket === 'all') return true;
    if (filterSubmarket === '5star') return item.data.stars === 5;
    if (filterSubmarket === 'bole') return item.data.cityArea.toLowerCase().includes('bole');
    if (filterSubmarket === 'kazanchis') return item.data.cityArea.toLowerCase().includes('kazanchis') || item.data.cityArea.toLowerCase().includes('kirkos');
    return true;
  });

  const activeHotel = MONITORED_HOTELS.find(h => h.id === activeBlipId) || MONITORED_HOTELS[0];

  return (
    <div className="relative rounded-3xl bg-slate-950 text-white p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Background Motion Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,107,255,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D2FF]/5 to-transparent h-20 animate-scanline pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D2FF]" />
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#00D2FF] uppercase">
              LIVE MOTION GRAPHIC · COMP-SET RADAR SCANNER
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              360° ACTIVE
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Real-Time Metasearch Frequency Radar
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Live omni-directional sweep tracking rate changes, OTA channel positioning, and comp-set parity across Addis Ababa and Ethiopian hospitality hubs.
          </p>
        </div>

        {/* Telemetry Quick Filters & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterSubmarket('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterSubmarket === 'all'
                ? 'bg-[#1E6BFF] text-white shadow-md shadow-[#1E6BFF]/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Submarkets
          </button>
          <button
            onClick={() => setFilterSubmarket('5star')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterSubmarket === '5star'
                ? 'bg-[#1E6BFF] text-white shadow-md shadow-[#1E6BFF]/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            5-Star Luxury
          </button>
          <button
            onClick={() => setFilterSubmarket('bole')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterSubmarket === 'bole'
                ? 'bg-[#1E6BFF] text-white shadow-md shadow-[#1E6BFF]/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Bole Corridor
          </button>
          <button
            onClick={() => setSweepSpeed(s => s === 'normal' ? 'fast' : 'normal')}
            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 text-[#00D2FF] border border-[#00D2FF]/30 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Toggle Radar Sweep Frequency"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{sweepSpeed === 'fast' ? 'Sweep: 2.5s' : 'Sweep: 4.0s'}</span>
          </button>
        </div>
      </div>

      {/* Main Radar Motion Graphic Display (Split View) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left Column: Interactive Radar Canvas Motion Graphic */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-slate-950 border-2 border-slate-800 p-2 shadow-[0_0_50px_rgba(30,107,255,0.15)] flex items-center justify-center overflow-hidden">
            
            {/* Radar Concentric Rings */}
            <div className="absolute inset-4 rounded-full border border-slate-800/80 pointer-events-none" />
            <div className="absolute inset-14 rounded-full border border-slate-800/70 pointer-events-none" />
            <div className="absolute inset-24 rounded-full border border-slate-800/60 pointer-events-none" />
            <div className="absolute inset-36 rounded-full border border-slate-700/50 pointer-events-none" />
            
            {/* Center Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800/90 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-slate-800/90 pointer-events-none" />
            
            {/* Degree Markers */}
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500 font-bold">000° N</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-500 font-bold">180° S</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 font-bold">270° W</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 font-bold">090° E</span>

            {/* Radar 360° Sweep Line with Glowing Trail (Motion Graphic) */}
            {isSweepActive && (
              <div 
                className={`absolute inset-0 pointer-events-none ${
                  sweepSpeed === 'fast' ? 'animate-radar-sweep-fast' : 'animate-radar-sweep'
                }`}
                style={{ transformOrigin: 'center center' }}
              >
                {/* Conical gradient trail representing radar phosphor fade */}
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 210, 255, 0.28) 0deg, rgba(30, 107, 255, 0.08) 40deg, transparent 60deg, transparent 360deg)'
                  }}
                />
                {/* Sharp Leading Sweep Beam Line */}
                <div 
                  className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-[#00D2FF] to-white shadow-[0_0_12px_#00D2FF]"
                  style={{ transformOrigin: 'bottom center' }}
                />
              </div>
            )}

            {/* Center Hub Indicator (RevMax Ground Station) */}
            <div className="relative z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-[#1E6BFF] to-[#00D2FF] p-0.5 shadow-lg shadow-[#00D2FF]/50 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Radio className="w-4 h-4 text-[#00D2FF] animate-pulse" />
              </div>
            </div>

            {/* Interactive Hotel Blips Positioned Polar Coordinates */}
            {blipHotels.map((blip) => {
              // Convert angle & radius to Cartesian percentages (center is 50%, 50%)
              const rad = (blip.angle - 90) * (Math.PI / 180);
              const rPercent = (blip.radius / 100) * 44; // keep inside circle
              const x = 50 + rPercent * Math.cos(rad);
              const y = 50 + rPercent * Math.sin(rad);

              const isSelected = activeBlipId === blip.id;

              return (
                <div
                  key={blip.id}
                  style={{ top: `${y}%`, left: `${x}%` }}
                  onClick={() => {
                    setActiveBlipId(blip.id);
                    onSelectHotel?.(blip.id);
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  {/* Blip Outer Pulse Ring */}
                  <span className={`absolute -inset-2 rounded-full pointer-events-none transition-all ${
                    isSelected 
                      ? 'bg-[#00D2FF]/40 animate-ping' 
                      : 'group-hover:bg-[#1E6BFF]/30'
                  }`} />

                  {/* Blip Core Dot */}
                  <div className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 ${
                    isSelected 
                      ? 'bg-[#00D2FF] ring-4 ring-[#00D2FF]/30 shadow-[0_0_15px_#00D2FF]' 
                      : blip.status === 'warning'
                        ? 'bg-amber-400 ring-2 ring-amber-400/30'
                        : blip.status === 'advantage'
                          ? 'bg-emerald-400 ring-2 ring-emerald-400/30'
                          : 'bg-[#1E6BFF] ring-2 ring-[#1E6BFF]/40'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Micro Floating Rate Tag */}
                  <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all shadow-md pointer-events-none ${
                    isSelected
                      ? 'bg-[#00D2FF] text-slate-950 scale-105'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 group-hover:text-white group-hover:border-[#00D2FF]'
                  }`}>
                    ${blip.data.tonightRateUSD}
                  </div>
                </div>
              );
            })}

          </div>

          {/* Radar Control Toggle */}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => setIsSweepActive(!isSweepActive)}
              className="hover:text-[#00D2FF] transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
            >
              <span className={`w-2 h-2 rounded-full ${isSweepActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              {isSweepActive ? 'Freeze Radar Sweep' : 'Resume 360° Sweep'}
            </button>
            <span>·</span>
            <span className="font-mono text-slate-500">{blipHotels.length} Target Properties Locked</span>
          </div>
        </div>

        {/* Right Column: Selected Hotel Telemetry Target Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm relative overflow-hidden">
            {/* Card Accent Top Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1E6BFF] via-[#00D2FF] to-emerald-400" />

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-[#00D2FF] font-bold">
                <Activity className="w-3.5 h-3.5" />
                TELEMETRY ACQUISITION: {activeHotel.id.toUpperCase()}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                98.8% SIGNAL
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {activeHotel.name}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {activeHotel.location} · {activeHotel.cityArea}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold font-mono text-[#00D2FF]">
                    ${activeHotel.tonightRateUSD}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Tonight / Night</div>
                </div>
              </div>

              {/* Live Metric Meters */}
              <div className="grid grid-cols-3 gap-3 my-4 pt-4 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Class</div>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">
                    {'★'.repeat(activeHotel.stars)}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Inventory</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {activeHotel.roomCount || 80} Keys
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Guest Score</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    {activeHotel.reviewScore || 4.5} / 5.0
                  </div>
                </div>
              </div>

              {/* Distribution Channel Parity Status */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Channel Integrity Status:</span>
                  <span className={`font-bold ${
                    activeHotel.otaRateParity === 'In Parity'
                      ? 'text-emerald-400'
                      : activeHotel.otaRateParity === 'Direct Cheaper'
                        ? 'text-[#00D2FF]'
                        : 'text-amber-400'
                  }`}>
                    {activeHotel.otaRateParity === 'In Parity' ? '✓ Strictly in Parity' : activeHotel.otaRateParity === 'Direct Cheaper' ? '★ Direct Engine Best Price' : '⚠ OTA Undercut Detected'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="text-slate-500">OTA Price:</span>
                  <span className="font-mono text-slate-200">
                    ${activeHotel.channelRates?.bookingCom || activeHotel.tonightRateUSD} on Booking.com
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">Direct:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    ${activeHotel.channelRates?.directWeb || activeHotel.tonightRateUSD}
                  </span>
                </div>
              </div>

              {/* Quick Actions to Comp-Set Matrix and Rate Parity Tools */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onNavigateToComparison?.(activeHotel.id)}
                  className="px-4 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#1E6BFF]/20"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Compare Comp-Set</span>
                </button>

                <button
                  onClick={() => onNavigateToParity?.(activeHotel.id)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#00D2FF] border border-slate-700 hover:border-[#00D2FF]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Audit Parity</span>
                </button>
              </div>

              {/* Consultation Link */}
              <div className="mt-3 text-center">
                <button
                  onClick={() => onOpenAuditModal?.(`Yield Audit for ${activeHotel.name}`)}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Request Custom Comp-Set Setup for this Hotel</span>
                  <ArrowRight className="w-3 h-3 text-[#00D2FF]" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Live Streaming Telemetry Feed Ticker */}
      <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-[#00D2FF] font-bold">RADAR TELEMETRY:</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Frequency: 432 Hz</span>
          <span>·</span>
          <span>Network Latency: 14ms</span>
          <span>·</span>
          <span>Zero Paid API Dependencies (Free Deployment Verified)</span>
        </div>
        <div className="text-slate-500">
          Last Metasearch Ping: Just now · 15-min auto-refresh cycle
        </div>
      </div>

    </div>
  );
}
