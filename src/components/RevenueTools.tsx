import { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  RefreshCw, 
  ArrowRightLeft,
  Building,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { CurrencyRates } from '../types';

interface RevenueToolsProps {
  onOpenAuditModal?: () => void;
}

export default function RevenueTools({ onOpenAuditModal }: RevenueToolsProps) {
  const [activeCalculator, setActiveCalculator] = useState<
    'revenue' | 'adr' | 'revpar' | 'occupancy' | 'ota' | 'profit' | 'fx'
  >('revenue');

  // Currency Rates State
  const [rates, setRates] = useState<CurrencyRates>({
    USD: 1.0,
    ETB: 142.50,
    EUR: 0.92,
    GBP: 0.77,
    AED: 3.67,
    SAR: 3.75,
  });
  const [isUpdatingRates, setIsUpdatingRates] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Live Feed');

  // Fetch live exchange rates
  const fetchRates = async () => {
    setIsUpdatingRates(true);
    try {
      const res = await fetch('/api/exchange-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (e) {
      console.warn('Using baseline rates', e);
    } finally {
      setIsUpdatingRates(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // 1. Revenue Calculator State
  const [revRooms, setRevRooms] = useState<number>(80);
  const [revAdr, setRevAdr] = useState<number>(115);
  const [revOcc, setRevOcc] = useState<number>(68);
  const [revDays, setRevDays] = useState<number>(30);

  // Calculated outputs
  const dailyRevenue = (revRooms * (revOcc / 100)) * revAdr;
  const periodRevenue = dailyRevenue * revDays;
  const annualRevenue = dailyRevenue * 365;
  const calculatedRevPAR = (revAdr * (revOcc / 100));

  // 2. ADR Calculator State
  const [adrTotalRev, setAdrTotalRev] = useState<number>(18500);
  const [adrOccupiedRooms, setAdrOccupiedRooms] = useState<number>(145);
  const calculatedADR = adrOccupiedRooms > 0 ? (adrTotalRev / adrOccupiedRooms) : 0;

  // 3. RevPAR Calculator State
  const [revparInputAdr, setRevparInputAdr] = useState<number>(135);
  const [revparInputOcc, setRevparInputOcc] = useState<number>(72);
  const directRevPAR = revparInputAdr * (revparInputOcc / 100);

  // 4. Occupancy Calculator State
  const [occSold, setOccSold] = useState<number>(54);
  const [occAvailable, setOccAvailable] = useState<number>(75);
  const calculatedOccPercent = occAvailable > 0 ? ((occSold / occAvailable) * 100) : 0;

  // 5. OTA Commission Calculator State
  const [otaPlatform, setOtaPlatform] = useState<'booking' | 'expedia' | 'agoda' | 'trip'>('booking');
  const [otaGrossRev, setOtaGrossRev] = useState<number>(25000);
  const [otaCustomCommission, setOtaCustomCommission] = useState<number>(16);

  const getOtaPresetRate = (plat: 'booking' | 'expedia' | 'agoda' | 'trip') => {
    switch (plat) {
      case 'booking': return 16;
      case 'expedia': return 19;
      case 'agoda': return 17;
      case 'trip': return 15;
    }
  };

  const handleSelectPlatform = (plat: 'booking' | 'expedia' | 'agoda' | 'trip') => {
    setOtaPlatform(plat);
    setOtaCustomCommission(getOtaPresetRate(plat));
  };

  const otaCommissionAmount = (otaGrossRev * otaCustomCommission) / 100;
  const otaNetRevenue = otaGrossRev - otaCommissionAmount;

  // 6. Hotel Profitability Calculator State
  const [profitRevenue, setProfitRevenue] = useState<number>(120000);
  const [profitPayroll, setProfitPayroll] = useState<number>(34000);
  const [profitUtilities, setProfitUtilities] = useState<number>(14000);
  const [profitOtaCosts, setProfitOtaCosts] = useState<number>(18500);
  const [profitOtherExp, setProfitOtherExp] = useState<number>(12500);

  const totalExpenses = profitPayroll + profitUtilities + profitOtaCosts + profitOtherExp;
  const grossProfit = profitRevenue - profitOtaCosts;
  const netProfit = profitRevenue - totalExpenses;
  const profitMargin = profitRevenue > 0 ? ((netProfit / profitRevenue) * 100) : 0;

  // 7. Live Exchange Rate Center State
  const [fxAmount, setFxAmount] = useState<number>(75);
  const [fxSourceCurrency, setFxSourceCurrency] = useState<keyof CurrencyRates>('USD');

  const amountInUSD = fxSourceCurrency === 'USD' 
    ? fxAmount 
    : fxAmount / (rates[fxSourceCurrency] || 1);

  const convertTo = (cur: keyof CurrencyRates) => {
    return (amountInUSD * (rates[cur] || 1)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <section id="revenue-tools" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Commercial Analytics · Diagnostic Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospitality Revenue & Financial Calculators
          </h2>
          <p className="mt-2 text-slate-600 text-base leading-relaxed">
            Equip your commercial and revenue team with the quantitative models used by world-class asset managers. Instant computational yields, OTA margin exposure, and real-time multi-currency conversions.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl overflow-x-auto mb-8 scrollbar-none">
          {[
            { id: 'revenue', label: '1. Revenue Calculator', icon: Calculator },
            { id: 'adr', label: '2. ADR Calculator', icon: DollarSign },
            { id: 'revpar', label: '3. RevPAR Calculator', icon: TrendingUp },
            { id: 'occupancy', label: '4. Occupancy %', icon: Percent },
            { id: 'ota', label: '5. OTA Commissions', icon: PieChart },
            { id: 'profit', label: '6. Profitability & Margins', icon: Building },
            { id: 'fx', label: 'Live Exchange Rates', icon: ArrowRightLeft },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCalculator === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCalculator(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E6BFF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00D2FF]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tool View */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative">
          
          {/* 1. REVENUE CALCULATOR */}
          {activeCalculator === 'revenue' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Full-Property Revenue & RevPAR Projector</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate total top-line room yield across daily, monthly, and annual operational periods.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Yield Formula</div>
                  <div className="text-xs font-mono font-bold text-[#1E6BFF]">RevPAR = ADR × (Occupancy / 100)</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                      <span>Total Available Rooms</span>
                      <span className="font-mono text-[#1E6BFF]">{revRooms} rooms</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={revRooms}
                      onChange={(e) => setRevRooms(Number(e.target.value))}
                      className="w-full accent-[#1E6BFF] cursor-pointer"
                    />
                    <div className="flex gap-2 mt-2">
                      {[30, 50, 80, 120, 200, 350].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRevRooms(r)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                            revRooms === r
                              ? 'border-[#1E6BFF] text-[#1E6BFF] bg-blue-50'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {r} rms
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                      <span>Average Daily Rate (ADR)</span>
                      <span className="font-mono text-[#1E6BFF]">${revAdr} USD</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="450"
                      step="5"
                      value={revAdr}
                      onChange={(e) => setRevAdr(Number(e.target.value))}
                      className="w-full accent-[#1E6BFF] cursor-pointer"
                    />
                    <div className="flex gap-2 mt-2">
                      {[65, 95, 120, 165, 240].map((a) => (
                        <button
                          key={a}
                          onClick={() => setRevAdr(a)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                            revAdr === a
                              ? 'border-[#1E6BFF] text-[#1E6BFF] bg-blue-50'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          ${a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                      <span>Occupancy Percentage</span>
                      <span className="font-mono text-[#1E6BFF]">{revOcc}%</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      step="1"
                      value={revOcc}
                      onChange={(e) => setRevOcc(Number(e.target.value))}
                      className="w-full accent-[#1E6BFF] cursor-pointer"
                    />
                    <div className="flex gap-2 mt-2">
                      {[50, 60, 70, 80, 90, 98].map((o) => (
                        <button
                          key={o}
                          onClick={() => setRevOcc(o)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${
                            revOcc === o
                              ? 'border-[#1E6BFF] text-[#1E6BFF] bg-blue-50'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {o}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                      <span>Projection Period (Days)</span>
                      <span className="font-mono text-[#1E6BFF]">{revDays} Days</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: '7 Days', val: 7 },
                        { label: '30 Days', val: 30 },
                        { label: '90 Days', val: 90 },
                        { label: '365 Days', val: 365 },
                      ].map((d) => (
                        <button
                          key={d.val}
                          onClick={() => setRevDays(d.val)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            revDays === d.val
                              ? 'bg-[#1E6BFF] border-[#1E6BFF] text-white shadow-sm'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#1E6BFF] font-bold">
                    Calculated Commercial Yield
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">Daily Room Revenue</div>
                      <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                        ${dailyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        ~{(dailyRevenue * rates.ETB).toLocaleString(undefined, { maximumFractionDigits: 0 })} ETB
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">RevPAR (Per Avail Room)</div>
                      <div className="text-2xl font-extrabold font-mono text-[#1E6BFF] mt-1">
                        ${calculatedRevPAR.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        ~{(calculatedRevPAR * rates.ETB).toFixed(0)} ETB
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span className="font-semibold">{revDays}-Day Period Total</span>
                      <span className="font-mono text-xs text-emerald-700 font-bold">Occupied: {(revRooms * (revOcc / 100) * revDays).toFixed(0)} Rms</span>
                    </div>
                    <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1">
                      ${periodRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-slate-500">USD</span>
                    </div>
                    <div className="text-xs text-[#1E6BFF] mt-1 font-mono font-bold">
                      ≈ {(periodRevenue * rates.ETB).toLocaleString(undefined, { maximumFractionDigits: 0 })} ETB
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Annual Run-Rate Gross (365d)</div>
                      <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">
                        ${annualRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                      </div>
                    </div>
                    <button
                      onClick={onOpenAuditModal}
                      className="px-4 py-2 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                    >
                      Audit Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ADR CALCULATOR */}
          {activeCalculator === 'adr' && (
            <div>
              <div className="pb-6 border-b border-slate-200 mb-8">
                <h3 className="text-xl font-bold text-slate-900">Average Daily Rate (ADR) Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Formula: Total Room Revenue ÷ Total Occupied Rooms Sold
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Room Revenue Generated (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={adrTotalRev}
                        onChange={(e) => setAdrTotalRev(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Occupied Rooms Sold
                    </label>
                    <input
                      type="number"
                      value={adrOccupiedRooms}
                      onChange={(e) => setAdrOccupiedRooms(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Calculated ADR</div>
                  <div className="text-5xl font-extrabold font-mono text-[#1E6BFF] mb-2">
                    ${calculatedADR.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    ≈ {(calculatedADR * rates.ETB).toFixed(2)} ETB per occupied room night
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Excludes complimentary rooms & room-only taxes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. REVPAR CALCULATOR */}
          {activeCalculator === 'revpar' && (
            <div>
              <div className="pb-6 border-b border-slate-200 mb-8">
                <h3 className="text-xl font-bold text-slate-900">Revenue Per Available Room (RevPAR) Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Formula: ADR ($) × Occupancy Percentage (%)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Average Daily Rate (ADR in USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={revparInputAdr}
                        onChange={(e) => setRevparInputAdr(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Occupancy Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={revparInputOcc}
                        max="100"
                        min="0"
                        onChange={(e) => setRevparInputOcc(Math.min(100, Math.max(0, Number(e.target.value))))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                      />
                      <span className="absolute right-3.5 top-2.5 text-slate-400 text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Calculated RevPAR</div>
                  <div className="text-5xl font-extrabold font-mono text-[#1E6BFF] mb-2">
                    ${directRevPAR.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    ≈ {(directRevPAR * rates.ETB).toFixed(2)} ETB per room
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. OCCUPANCY CALCULATOR */}
          {activeCalculator === 'occupancy' && (
            <div>
              <div className="pb-6 border-b border-slate-200 mb-8">
                <h3 className="text-xl font-bold text-slate-900">Occupancy Percentage Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Formula: (Rooms Sold ÷ Total Available Rooms) × 100
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rooms Sold (Occupied)
                    </label>
                    <input
                      type="number"
                      value={occSold}
                      onChange={(e) => setOccSold(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Available Rooms in Inventory
                    </label>
                    <input
                      type="number"
                      value={occAvailable}
                      onChange={(e) => setOccAvailable(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Current Occupancy</div>
                  <div className="text-5xl font-extrabold font-mono text-emerald-600 mb-2">
                    {calculatedOccPercent.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-600">
                    {occSold} sold out of {occAvailable} total available inventory
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. OTA COMMISSION CALCULATOR */}
          {activeCalculator === 'ota' && (
            <div>
              <div className="pb-6 border-b border-slate-200 mb-8">
                <h3 className="text-xl font-bold text-slate-900">OTA Channel Commission & Net Yield Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Measure true channel revenue deduction across Booking.com, Expedia, Agoda, and Trip.com.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Select Channel Partner</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'booking', name: 'Booking.com', rate: 16 },
                        { id: 'expedia', name: 'Expedia', rate: 19 },
                        { id: 'agoda', name: 'Agoda', rate: 17 },
                        { id: 'trip', name: 'Trip.com', rate: 15 },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectPlatform(item.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            otaPlatform === item.id
                              ? 'bg-blue-50 border-[#1E6BFF] text-[#1E6BFF]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{item.rate}% base</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gross OTA Booking Revenue (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={otaGrossRev}
                        onChange={(e) => setOtaGrossRev(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                      <span>Effective Commission Rate</span>
                      <span className="font-mono text-[#1E6BFF] font-bold">{otaCustomCommission}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="0.5"
                      value={otaCustomCommission}
                      onChange={(e) => setOtaCustomCommission(Number(e.target.value))}
                      className="w-full accent-[#1E6BFF] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#1E6BFF] font-bold">
                    Channel Net Revenue Breakdown
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-600 font-medium">Gross Room Production</span>
                      <span className="font-mono text-slate-900 font-bold">${otaGrossRev.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-800">
                      <span className="text-xs font-medium">OTA Commission Deducted ({otaCustomCommission}%)</span>
                      <span className="font-mono font-bold">-${otaCommissionAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                      <div>
                        <div className="text-xs font-bold">Net Hotel Cash Received</div>
                        <div className="text-[11px] text-emerald-700">≈ {(otaNetRevenue * rates.ETB).toLocaleString(undefined, { maximumFractionDigits: 0 })} ETB</div>
                      </div>
                      <span className="font-mono text-2xl font-extrabold text-emerald-700">${otaNetRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. HOTEL PROFITABILITY CALCULATOR */}
          {activeCalculator === 'profit' && (
            <div>
              <div className="pb-6 border-b border-slate-200 mb-8">
                <h3 className="text-xl font-bold text-slate-900">Hotel Profitability & Margin Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Assess Gross Operating Profit (GOP), direct expense deductions, and net hotel margin.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Total Monthly Revenue (USD)</label>
                    <input
                      type="number"
                      value={profitRevenue}
                      onChange={(e) => setProfitRevenue(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-mono text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Payroll & Labor</label>
                      <input
                        type="number"
                        value={profitPayroll}
                        onChange={(e) => setProfitPayroll(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Utilities & Power</label>
                      <input
                        type="number"
                        value={profitUtilities}
                        onChange={(e) => setProfitUtilities(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">OTA Commission Costs</label>
                      <input
                        type="number"
                        value={profitOtaCosts}
                        onChange={(e) => setProfitOtaCosts(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">F&B & Other OpEx</label>
                      <input
                        type="number"
                        value={profitOtherExp}
                        onChange={(e) => setProfitOtherExp(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#1E6BFF] font-bold">
                    Net Operating Performance
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500">Total Operating Expenses</div>
                      <div className="text-lg font-mono font-bold text-slate-900 mt-1">
                        ${totalExpenses.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500">Gross Profit (Post-OTA)</div>
                      <div className="text-lg font-mono font-bold text-slate-900 mt-1">
                        ${grossProfit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-700 font-semibold">Net Profit</span>
                      <span className="text-xs font-mono text-[#1E6BFF] font-bold">Profit Margin</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-1">
                      <div className="text-3xl font-extrabold font-mono text-slate-900">
                        ${netProfit.toLocaleString()}
                      </div>
                      <div className={`text-2xl font-bold font-mono ${profitMargin >= 30 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {profitMargin.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. LIVE EXCHANGE RATE CENTER */}
          {activeCalculator === 'fx' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Live Hospitality Exchange Rate Center</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time FX conversions for ADR, Room Revenue, and OTA commission accounting in Ethiopia & East Africa.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-mono">Status: {lastUpdated}</span>
                  <button
                    onClick={fetchRates}
                    disabled={isUpdatingRates}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-sm font-semibold"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingRates ? 'animate-spin text-[#1E6BFF]' : ''}`} />
                    <span>Refresh Feed</span>
                  </button>
                </div>
              </div>

              {/* Conversion Input */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-8 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Amount to Convert (e.g. Target ADR = $75)</label>
                    <input
                      type="number"
                      value={fxAmount}
                      onChange={(e) => setFxAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-[#1E6BFF]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Base Currency</label>
                    <select
                      value={fxSourceCurrency}
                      onChange={(e) => setFxSourceCurrency(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#1E6BFF]"
                    >
                      <option value="USD">USD — US Dollar</option>
                      <option value="ETB">ETB — Ethiopian Birr</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="AED">AED — UAE Dirham</option>
                      <option value="SAR">SAR — Saudi Riyal</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Multi-Currency Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { code: 'USD', name: 'US Dollar', symbol: '$' },
                  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'ETB ' },
                  { code: 'EUR', name: 'Euro', symbol: '€' },
                  { code: 'GBP', name: 'British Pound', symbol: '£' },
                  { code: 'AED', name: 'UAE Dirham', symbol: 'AED ' },
                  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR ' },
                ].map((cur) => {
                  const isCurrentBase = cur.code === fxSourceCurrency;
                  return (
                    <div
                      key={cur.code}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrentBase
                          ? 'bg-blue-50 border-[#1E6BFF] shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span className="font-bold text-slate-900">{cur.code}</span>
                        <span className="text-[10px] text-[#1E6BFF] font-mono font-semibold">1 USD = {rates[cur.code as keyof CurrencyRates]}</span>
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-900 mt-2 truncate">
                        {cur.symbol}{convertTo(cur.code as keyof CurrencyRates)}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 truncate">{cur.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
