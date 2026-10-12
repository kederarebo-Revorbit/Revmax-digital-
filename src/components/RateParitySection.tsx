import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  Search, 
  ExternalLink,
  Lock,
  Layers,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { MONITORED_HOTELS } from '../data/hospitalityData';
import { HotelRateItem } from '../types';

interface RateParitySectionProps {
  onOpenAuditModal?: (title?: string) => void;
  selectedHotelId?: string;
}

export default function RateParitySection({ onOpenAuditModal, selectedHotelId }: RateParitySectionProps) {
  // Selected hotel for live diagnosis
  const initialHotel = MONITORED_HOTELS.find(h => h.id === selectedHotelId) || MONITORED_HOTELS[0];
  const [activeHotel, setActiveHotel] = useState<HotelRateItem>(initialHotel);

  // Custom simulation inputs
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customHotelName, setCustomHotelName] = useState('My Hotel Addis Ababa');
  const [directRate, setDirectRate] = useState<number>(activeHotel.channelRates?.directWeb || 150);
  const [bookingRate, setBookingRate] = useState<number>(activeHotel.channelRates?.bookingCom || 150);
  const [expediaRate, setExpediaRate] = useState<number>(activeHotel.channelRates?.expedia || 155);
  const [agodaRate, setAgodaRate] = useState<number>(activeHotel.channelRates?.agoda || 142);
  const [tripRate, setTripRate] = useState<number>(activeHotel.channelRates?.tripCom || 150);

  // Financial leakage calculator inputs
  const [monthlyOtaRooms, setMonthlyOtaRooms] = useState<number>(240);
  const [avgCommissionRate, setAvgCommissionRate] = useState<number>(18); // 18% OTA commission

  // Update rates when active hotel changes
  const handleSelectHotel = (hotel: HotelRateItem) => {
    setActiveHotel(hotel);
    setIsCustomMode(false);
    if (hotel.channelRates) {
      setDirectRate(hotel.channelRates.directWeb);
      setBookingRate(hotel.channelRates.bookingCom);
      setExpediaRate(hotel.channelRates.expedia);
      setAgodaRate(hotel.channelRates.agoda);
      setTripRate(hotel.channelRates.tripCom);
    }
  };

  // Find lowest OTA rate
  const otaRates = [
    { channel: 'Booking.com', rate: bookingRate },
    { channel: 'Expedia', rate: expediaRate },
    { channel: 'Agoda', rate: agodaRate },
    { channel: 'Trip.com', rate: tripRate }
  ];
  const lowestOta = [...otaRates].sort((a, b) => a.rate - b.rate)[0];

  const parityDifference = directRate - lowestOta.rate;
  const isUndercut = parityDifference > 0;
  const isDirectCheaper = parityDifference < 0;
  const isInParity = parityDifference === 0;

  // Financial Leakage Calculations
  const avgOtaRate = (bookingRate + expediaRate + agodaRate + tripRate) / 4;
  const monthlyGrossOtaRevenue = monthlyOtaRooms * avgOtaRate;
  const monthlyOtaCommissionPaid = monthlyGrossOtaRevenue * (avgCommissionRate / 100);
  const annualCommissionLeakage = monthlyOtaCommissionPaid * 12;
  const projectedRecoverableDirectRevenue = monthlyGrossOtaRevenue * 0.35 * (avgCommissionRate / 100) * 12;

  return (
    <section id="parity" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
              Distribution Integrity · OTA Rate Parity Monitor
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Rate Parity & OTA Leakage Diagnostic
            </h2>
            <p className="mt-2 text-slate-600 text-base leading-relaxed">
              Detect unauthorized OTA undercutting, wholesale B2B rate leakage, and unfair metasearch disparity across Booking.com, Expedia, Agoda, and Trip.com in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuditModal?.('Rate Parity Enforcement Audit')}
              className="px-5 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md shadow-[#1E6BFF]/20 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
              <span>Request Parity Audit</span>
            </button>
          </div>
        </div>

        {/* Live Parity Benchmark Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
            <div className="text-xs font-medium text-slate-500">Tracked Market Rate Parity</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">73.8%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> In Parity Across Top 5-Stars
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
            <div className="text-xs font-medium text-slate-500">OTA Disparity Frequency</div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">26.2%</div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">
              Chiefly Agoda & Trip.com wholesale leaks
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
            <div className="text-xs font-medium text-slate-500">Average Disparity Gap</div>
            <div className="text-2xl font-extrabold text-[#1E6BFF] mt-1">$14.20</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Lost direct margin per room night
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
            <div className="text-xs font-medium text-slate-500">Average OTA Commission</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">18.5%</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
              RevMax direct strategy saves 12-15%
            </div>
          </div>
        </div>

        {/* Interactive Property Rate Parity Checker */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#1E6BFF] tracking-wider uppercase">
                LIVE PARITY CHECKER ENGINE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Multi-Channel Rate Inspection for: <span className="text-[#1E6BFF]">{isCustomMode ? customHotelName : activeHotel.name}</span>
              </h3>
            </div>

            {/* Quick Hotel Picker */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Select Property:</span>
              <select
                value={isCustomMode ? 'custom' : activeHotel.id}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustomMode(true);
                  } else {
                    const found = MONITORED_HOTELS.find(h => h.id === e.target.value);
                    if (found) handleSelectHotel(found);
                  }
                }}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#1E6BFF] cursor-pointer shadow-xs"
              >
                {MONITORED_HOTELS.slice(0, 15).map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.cityArea})
                  </option>
                ))}
                <option value="custom">✏️ Test Custom / Your Own Hotel</option>
              </select>
            </div>
          </div>

          {/* If Custom Mode Enabled */}
          {isCustomMode && (
            <div className="pt-4 pb-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Custom Hotel Name</label>
              <input
                type="text"
                value={customHotelName}
                onChange={(e) => setCustomHotelName(e.target.value)}
                className="w-full sm:w-80 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#1E6BFF]"
                placeholder="Enter your hotel name"
              />
            </div>
          )}

          {/* Rates Across Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 my-6">
            
            {/* Direct Channel */}
            <div className="bg-white border-2 border-[#1E6BFF] rounded-2xl p-4.5 relative shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1E6BFF] uppercase tracking-wider font-mono">
                  Official Website
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1E6BFF] border border-blue-200">
                  Direct Channel
                </span>
              </div>
              <div className="text-xs text-slate-500 mb-1">Your Direct Selling Rate</div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={directRate}
                  onChange={(e) => setDirectRate(Number(e.target.value))}
                  className="text-2xl font-black text-slate-900 w-24 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#1E6BFF]"
                />
                <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <div className="mt-3 text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 0% Commission Cost
              </div>
            </div>

            {/* Booking.com */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Booking.com</span>
                <span className="text-[10px] font-mono font-medium text-slate-400">18% Comm</span>
              </div>
              <div className="text-xs text-slate-500 mb-1">Public OTA Rate</div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={bookingRate}
                  onChange={(e) => setBookingRate(Number(e.target.value))}
                  className="text-2xl font-black text-slate-900 w-24 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#1E6BFF]"
                />
                <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <div className={`mt-3 text-[11px] font-medium ${bookingRate < directRate ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {bookingRate < directRate ? `⚠️ Undercuts by $${directRate - bookingRate}` : '✓ Matches Direct'}
              </div>
            </div>

            {/* Expedia */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Expedia</span>
                <span className="text-[10px] font-mono font-medium text-slate-400">19% Comm</span>
              </div>
              <div className="text-xs text-slate-500 mb-1">Public OTA Rate</div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={expediaRate}
                  onChange={(e) => setExpediaRate(Number(e.target.value))}
                  className="text-2xl font-black text-slate-900 w-24 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#1E6BFF]"
                />
                <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <div className={`mt-3 text-[11px] font-medium ${expediaRate < directRate ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {expediaRate < directRate ? `⚠️ Undercuts by $${directRate - expediaRate}` : '✓ Matches or Higher'}
              </div>
            </div>

            {/* Agoda */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Agoda</span>
                <span className="text-[10px] font-mono font-medium text-slate-400">20% Comm</span>
              </div>
              <div className="text-xs text-slate-500 mb-1">Public OTA Rate</div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={agodaRate}
                  onChange={(e) => setAgodaRate(Number(e.target.value))}
                  className="text-2xl font-black text-slate-900 w-24 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#1E6BFF]"
                />
                <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <div className={`mt-3 text-[11px] font-medium ${agodaRate < directRate ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {agodaRate < directRate ? `⚠️ Undercuts by $${directRate - agodaRate}` : '✓ Matches Direct'}
              </div>
            </div>

            {/* Trip.com */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Trip.com</span>
                <span className="text-[10px] font-mono font-medium text-slate-400">18% Comm</span>
              </div>
              <div className="text-xs text-slate-500 mb-1">Public OTA Rate</div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={tripRate}
                  onChange={(e) => setTripRate(Number(e.target.value))}
                  className="text-2xl font-black text-slate-900 w-24 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#1E6BFF]"
                />
                <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <div className={`mt-3 text-[11px] font-medium ${tripRate < directRate ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                {tripRate < directRate ? `⚠️ Undercuts by $${directRate - tripRate}` : '✓ Matches Direct'}
              </div>
            </div>

          </div>

          {/* Diagnostic Result Callout */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isUndercut 
              ? 'bg-rose-50/70 border-rose-200' 
              : isDirectCheaper
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-blue-50/70 border-blue-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                {isUndercut ? (
                  <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                ) : isDirectCheaper ? (
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-[#1E6BFF]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isUndercut 
                      ? `PARITY BREACH DETECTED — ${lowestOta.channel} is undercutting your direct rate by $${parityDifference} (${((parityDifference / directRate) * 100).toFixed(1)}%)`
                      : isDirectCheaper
                      ? `DIRECT ADVANTAGE ACTIVE — Direct website is $${Math.abs(parityDifference)} cheaper than OTAs`
                      : 'RATE INTEGRITY SECURED — Direct website is in 100% parity with all OTA channels'
                    }
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isUndercut 
                      ? `Guests looking up your property on Google Hotels metasearch will see ${lowestOta.channel} as the cheapest provider, diverting booking traffic away from your commission-free website.`
                      : isDirectCheaper
                      ? 'You are actively incentivizing direct bookers and maximizing net RevPAR.'
                      : 'No OTA undercuts detected tonight. Ensure your booking engine provides an exclusive direct perk (e.g. free airport transfer or breakfast) to win direct conversions.'
                    }
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenAuditModal?.(`OTA Parity Resolution for ${isCustomMode ? customHotelName : activeHotel.name}`)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#1E6BFF] text-slate-800 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs hover:text-[#1E6BFF]"
              >
                Resolve Parity Discrepancy
              </button>
            </div>
          </div>

          {/* Interactive Parity Financial Bleed Calculator */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#1E6BFF]" />
              <span>OTA Commission & Disparity Leakage Calculator</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Monthly Room Nights Booked via OTAs:</span>
                    <span className="font-bold font-mono text-[#1E6BFF]">{monthlyOtaRooms} rooms/mo</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="1500"
                    step="10"
                    value={monthlyOtaRooms}
                    onChange={(e) => setMonthlyOtaRooms(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E6BFF]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>30 rooms</span>
                    <span>750 rooms</span>
                    <span>1,500 rooms</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Average Blended OTA Commission Rate:</span>
                    <span className="font-bold font-mono text-[#1E6BFF]">{avgCommissionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="25"
                    step="0.5"
                    value={avgCommissionRate}
                    onChange={(e) => setAvgCommissionRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E6BFF]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>15% (Preferred)</span>
                    <span>18% (Standard)</span>
                    <span>25% (High Visibility)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Results Box */}
              <div className="md:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] font-medium text-slate-500">Monthly Commission Paid</div>
                    <div className="text-xl font-extrabold text-slate-900 mt-1 font-mono">
                      ${Math.round(monthlyOtaCommissionPaid).toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Sent directly to third-party OTAs</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-slate-500">Annual Commission Expense</div>
                    <div className="text-xl font-extrabold text-rose-600 mt-1 font-mono">
                      ${Math.round(annualCommissionLeakage).toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
                    </div>
                    <div className="text-[10px] text-rose-700 font-medium mt-0.5">Annual leakage from property P&L</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Projected Direct Recovery with RevMax</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-0.5">
                      +${Math.round(projectedRecoverableDirectRevenue).toLocaleString()} USD added net margin / year
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenAuditModal?.('Direct Revenue Recovery Plan')}
                    className="px-3 py-1.5 rounded-lg bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-[11px] font-bold cursor-pointer"
                  >
                    Recover Margins
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Step RevMax Parity Protection Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Wholesale B2B Rate Auditing',
              desc: 'We audit contracted bedbanks (Hotelbeds, WebBeds) that dump discounted unbundled inventory onto Agoda and Ctrip.',
            },
            {
              step: '02',
              title: 'Automated Metasearch Rate Shopper',
              desc: '24/7 scraping across Google Hotels, Tripadvisor, and Trivago to detect and screenshot price undercutting instantly.',
            },
            {
              step: '03',
              title: 'Direct Fencing & CUG Rates',
              desc: 'Deploy Closed User Group (CUG) loyalty rates and exclusive direct value-add packages without violating standard contract clauses.',
            },
            {
              step: '04',
              title: 'Google Free Booking Links Optimization',
              desc: 'Integrate your certified booking engine directly with Google Hotels to capture direct bookers at zero commission.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-bold text-[#1E6BFF]">{item.step}</span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
