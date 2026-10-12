import { useState, useMemo } from 'react';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  X, 
  Check, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Sliders,
  DollarSign,
  HelpCircle,
  Award
} from 'lucide-react';
import { MONITORED_HOTELS } from '../data/hospitalityData';
import { HotelRateItem } from '../types';

interface CompSetComparisonProps {
  onOpenAuditModal?: (title?: string) => void;
  defaultHotelId?: string;
}

export default function CompSetComparison({ onOpenAuditModal, defaultHotelId }: CompSetComparisonProps) {
  // My Hotel selection
  const [myHotelId, setMyHotelId] = useState<string>(defaultHotelId || 'skylight');
  const [customMyHotelName, setCustomMyHotelName] = useState<string>('My Boutique Hotel');
  const [customMyHotelRate, setCustomMyHotelRate] = useState<number>(120);
  const [customMyHotelStars, setCustomMyHotelStars] = useState<number>(4);
  const [isMyHotelCustom, setIsMyHotelCustom] = useState<boolean>(false);

  // Selected competitor hotel IDs (2-4 competitors)
  const [competitorIds, setCompetitorIds] = useState<string[]>(['hyatt', 'sheraton', 'radisson']);

  // Current active hotel object
  const myHotel = useMemo(() => {
    if (isMyHotelCustom) {
      return {
        id: 'custom_my_hotel',
        name: customMyHotelName,
        location: 'Addis Ababa',
        cityArea: 'Addis Ababa Metro',
        stars: customMyHotelStars,
        tonightRateUSD: customMyHotelRate,
        tomorrowRateUSD: Math.round(customMyHotelRate * 1.05),
        weekendRateUSD: Math.round(customMyHotelRate * 0.95),
        sevenDayTrend: [customMyHotelRate - 5, customMyHotelRate, customMyHotelRate + 5, customMyHotelRate + 8, customMyHotelRate + 4, customMyHotelRate - 3, customMyHotelRate - 5],
        priceChangePercent: 4.0,
        recommendation: 'Normal Rate' as const,
        otaRateParity: 'In Parity' as const,
        bestChannel: 'Direct Website',
        reviewScore: 4.4,
        tripAdvisorRank: '#12 of 128 Hotels in Addis',
        amenities: ['Free Wi-Fi', 'Airport Shuttle', 'Restaurant & Bar', 'Gym']
      };
    }
    return MONITORED_HOTELS.find((h) => h.id === myHotelId) || MONITORED_HOTELS[0];
  }, [isMyHotelCustom, myHotelId, customMyHotelName, customMyHotelRate, customMyHotelStars]);

  // Competitor objects
  const competitors = useMemo(() => {
    return competitorIds
      .map((id) => MONITORED_HOTELS.find((h) => h.id === id))
      .filter((h): h is HotelRateItem => Boolean(h));
  }, [competitorIds]);

  // Available hotels to add as competitors (not already added and not myHotel)
  const availableToAdd = useMemo(() => {
    return MONITORED_HOTELS.filter(
      (h) => h.id !== myHotel.id && !competitorIds.includes(h.id)
    );
  }, [myHotel.id, competitorIds]);

  // Comp-Set Average Tonight Rate
  const compSetAvgRate = useMemo(() => {
    if (competitors.length === 0) return myHotel.tonightRateUSD;
    const sum = competitors.reduce((acc, c) => acc + c.tonightRateUSD, 0);
    return Math.round(sum / competitors.length);
  }, [competitors, myHotel]);

  // Rate variance vs comp-set
  const rateSpread = myHotel.tonightRateUSD - compSetAvgRate;
  const spreadPercent = ((rateSpread / compSetAvgRate) * 100).toFixed(1);

  // Add competitor
  const handleAddCompetitor = (hotelId: string) => {
    if (competitorIds.length >= 4) return;
    if (!competitorIds.includes(hotelId)) {
      setCompetitorIds([...competitorIds, hotelId]);
    }
  };

  // Remove competitor
  const handleRemoveCompetitor = (hotelId: string) => {
    setCompetitorIds(competitorIds.filter((id) => id !== hotelId));
  };

  // Quick Comp-Set presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'luxury5star') {
      setIsMyHotelCustom(false);
      setMyHotelId('skylight');
      setCompetitorIds(['hyatt', 'sheraton', 'radisson', 'hilton']);
    } else if (presetName === 'boleBusiness') {
      setIsMyHotelCustom(false);
      setMyHotelId('goldentulip');
      setCompetitorIds(['bestwestern', 'ramada', 'harmony', 'jupiterbole']);
    } else if (presetName === 'kazanchisDiplomatic') {
      setIsMyHotelCustom(false);
      setMyHotelId('radisson');
      setCompetitorIds(['elilly', 'interluxury', 'jupitercazanchis', 'grandpalace']);
    } else if (presetName === 'resorts') {
      setIsMyHotelCustom(false);
      setMyHotelId('kuriftubishoftu');
      setCompetitorIds(['kuriftuentoto', 'hailehawassa', 'sabana']);
    }
  };

  return (
    <section id="comparison" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
              Competitive Set Benchmarking · Head-to-Head Rates
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comp-Set Rate & Performance Comparison
            </h2>
            <p className="mt-2 text-slate-600 text-base leading-relaxed">
              Build your customized competitive set. Compare your hotel side-by-side with 2 to 4 competitor properties on tonight rates, weekend pricing, OTA parity, and TripAdvisor reputation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAuditModal?.(`Comp-Set Yield Strategy for ${myHotel.name}`)}
              className="px-5 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md shadow-[#1E6BFF]/20 flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-[#00D2FF]" />
              <span>Request Comp-Set Audit</span>
            </button>
          </div>
        </div>

        {/* Comp-Set Control Deck */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 mb-8 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Set "My Property" */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#1E6BFF] tracking-wider uppercase">
                  STEP 1: SELECT YOUR HOTEL
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1E6BFF] border border-blue-200">
                  Target Subject
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Choose from Directory or Test Custom:
                  </label>
                  <select
                    value={isMyHotelCustom ? 'custom' : myHotelId}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsMyHotelCustom(true);
                      } else {
                        setIsMyHotelCustom(false);
                        setMyHotelId(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#1E6BFF] cursor-pointer"
                  >
                    {MONITORED_HOTELS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} — ${h.tonightRateUSD} ({h.stars}★, {h.cityArea})
                      </option>
                    ))}
                    <option value="custom">✏️ Test Custom / Unlisted Property</option>
                  </select>
                </div>

                {/* If Custom Property */}
                {isMyHotelCustom && (
                  <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2 mt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700">Property Name</label>
                      <input
                        type="text"
                        value={customMyHotelName}
                        onChange={(e) => setCustomMyHotelName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">Tonight Rate ($)</label>
                        <input
                          type="number"
                          value={customMyHotelRate}
                          onChange={(e) => setCustomMyHotelRate(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">Stars</label>
                        <select
                          value={customMyHotelStars}
                          onChange={(e) => setCustomMyHotelStars(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                        >
                          <option value={5}>5-Star Luxury</option>
                          <option value={4}>4-Star Upscale</option>
                          <option value={3}>3-Star Midscale</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
                  <span>Tonight Rate: <strong className="text-slate-900 font-mono">${myHotel.tonightRateUSD}</strong></span>
                  <span>Location: <strong className="text-slate-900">{myHotel.cityArea}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Add Competitor Hotels */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-slate-700 tracking-wider uppercase">
                  STEP 2: ADD COMPETITORS ({competitors.length}/4 ACTIVE)
                </span>
                
                {/* Preset Chips */}
                <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400">Presets:</span>
                  <button
                    onClick={() => applyPreset('luxury5star')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E6BFF] cursor-pointer"
                  >
                    5-Star Luxury
                  </button>
                  <button
                    onClick={() => applyPreset('boleBusiness')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E6BFF] cursor-pointer"
                  >
                    Bole Hub
                  </button>
                  <button
                    onClick={() => applyPreset('kazanchisDiplomatic')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E6BFF] cursor-pointer"
                  >
                    Kazanchis
                  </button>
                  <button
                    onClick={() => applyPreset('resorts')}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E6BFF] cursor-pointer"
                  >
                    Resorts
                  </button>
                </div>
              </div>

              {/* Active Competitors Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {competitors.map((comp) => (
                  <div
                    key={comp.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <span>{comp.name}</span>
                    <span className="font-mono text-[#1E6BFF] font-bold">${comp.tonightRateUSD}</span>
                    <button
                      onClick={() => handleRemoveCompetitor(comp.id)}
                      className="text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {competitors.length < 4 && (
                  <div className="inline-flex items-center gap-1">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddCompetitor(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      defaultValue=""
                      className="bg-blue-50 border border-blue-200 text-[#1E6BFF] rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer focus:outline-none"
                    >
                      <option value="" disabled>+ Add Competitor Hotel...</option>
                      {availableToAdd.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} (${h.tonightRateUSD} - {h.cityArea})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Comp-Set Quick Summary Strip */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Comp-Set Avg Rate</span>
                  <strong className="text-sm font-mono text-slate-900">${compSetAvgRate} USD</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Your Variance vs Comp</span>
                  <strong className={`text-sm font-mono ${rateSpread >= 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {rateSpread >= 0 ? `+$${rateSpread}` : `-$${Math.abs(rateSpread)}`} ({spreadPercent}%)
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Pricing Position</span>
                  <strong className="text-sm text-[#1E6BFF]">
                    {rateSpread > 15 ? 'Premium Leader' : rateSpread < -15 ? 'Value Penetrator' : 'Market Aligned'}
                  </strong>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Head-to-Head Comparison Matrix Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-8">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200">
                  <th className="py-4 px-5 font-bold text-slate-700 w-52">Metrics & Parameters</th>
                  
                  {/* Column 1: My Hotel */}
                  <th className="py-4 px-5 bg-blue-50/70 border-x border-blue-200 font-extrabold text-[#1E6BFF] min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider font-mono text-[10px] bg-[#1E6BFF] text-white px-2 py-0.5 rounded">
                        MY PROPERTY
                      </span>
                      <span className="text-xs text-amber-500">{'★'.repeat(myHotel.stars)}</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 mt-1">{myHotel.name}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{myHotel.cityArea}</div>
                  </th>

                  {/* Columns: Competitors */}
                  {competitors.map((comp) => (
                    <th key={comp.id} className="py-4 px-5 border-r border-slate-200 min-w-[190px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">COMPETITOR</span>
                        <span className="text-xs text-amber-500">{'★'.repeat(comp.stars)}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1">{comp.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{comp.cityArea}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200">
                
                {/* Row: Tonight Rate */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-800 bg-slate-50/50">
                    Tonight Rate (USD)
                  </td>
                  <td className="py-3.5 px-5 bg-blue-50/30 border-x border-blue-200">
                    <span className="text-xl font-black font-mono text-slate-900">${myHotel.tonightRateUSD}</span>
                    <span className="text-[11px] text-slate-400 ml-1">/ night</span>
                  </td>
                  {competitors.map((comp) => {
                    const diff = comp.tonightRateUSD - myHotel.tonightRateUSD;
                    return (
                      <td key={comp.id} className="py-3.5 px-5 border-r border-slate-200">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold font-mono text-slate-900">${comp.tonightRateUSD}</span>
                          <span className={`text-[11px] font-mono font-semibold ${diff > 0 ? 'text-amber-600' : diff < 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {diff > 0 ? `(+$${diff})` : diff < 0 ? `(-$${Math.abs(diff)})` : '(=)'}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row: Tomorrow Rate */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">Tomorrow Rate</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200 font-mono font-bold text-slate-800">
                    ${myHotel.tomorrowRateUSD}
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200 font-mono font-medium text-slate-700">
                      ${comp.tomorrowRateUSD}
                    </td>
                  ))}
                </tr>

                {/* Row: Weekend Rate */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">Weekend Rate</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200 font-mono font-bold text-slate-800">
                    ${myHotel.weekendRateUSD}
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200 font-mono font-medium text-slate-700">
                      ${comp.weekendRateUSD}
                    </td>
                  ))}
                </tr>

                {/* Row: 7-Day Trend Visual Sparkline */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">7-Day Rate Trend</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200">
                    <div className="flex items-end gap-1 h-7">
                      {myHotel.sevenDayTrend.map((rate, i) => (
                        <div
                          key={i}
                          style={{ height: `${Math.max(20, Math.min(100, (rate / 250) * 100))}%` }}
                          className="w-3 rounded-xs bg-[#1E6BFF]"
                          title={`Day ${i + 1}: $${rate}`}
                        />
                      ))}
                    </div>
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200">
                      <div className="flex items-end gap-1 h-7">
                        {comp.sevenDayTrend.map((rate, i) => (
                          <div
                            key={i}
                            style={{ height: `${Math.max(20, Math.min(100, (rate / 250) * 100))}%` }}
                            className="w-3 rounded-xs bg-slate-400 hover:bg-slate-700 transition-colors"
                            title={`Day ${i + 1}: $${rate}`}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row: TripAdvisor & Rating */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">Review Score & Rank</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200">
                    <span className="font-bold text-slate-900">{myHotel.reviewScore} / 5.0</span>
                    <span className="block text-[10px] text-slate-500">{myHotel.tripAdvisorRank}</span>
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200">
                      <span className="font-bold text-slate-900">{comp.reviewScore} / 5.0</span>
                      <span className="block text-[10px] text-slate-500">{comp.tripAdvisorRank}</span>
                    </td>
                  ))}
                </tr>

                {/* Row: OTA Parity Status */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">OTA Parity Status</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3" /> {myHotel.otaRateParity}
                    </span>
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                        comp.otaRateParity === 'In Parity'
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                          : 'text-amber-700 bg-amber-50 border-amber-200'
                      }`}>
                        {comp.otaRateParity}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row: Best Direct Booking Route */}
                <tr>
                  <td className="py-3 px-5 font-semibold text-slate-700 bg-slate-50/50">Direct Booking Hub</td>
                  <td className="py-3 px-5 bg-blue-50/30 border-x border-blue-200 text-slate-800 font-medium">
                    {myHotel.bestChannel}
                  </td>
                  {competitors.map((comp) => (
                    <td key={comp.id} className="py-3 px-5 border-r border-slate-200 text-slate-600 font-medium">
                      {comp.bestChannel}
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>

        </div>

        {/* Dynamic RevMax Strategic Comp-Set Analysis */}
        <div className="p-6 sm:p-7 bg-gradient-to-r from-blue-50/80 via-slate-50 to-white border border-blue-200 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                <span className="text-xs font-mono font-bold text-[#1E6BFF] tracking-wider uppercase">
                  REVMAX AI COMMERCIAL STRATEGY RECOMMENDATION
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-slate-900">
                {rateSpread > 15 
                  ? `High-Yield Compression Positioning (+${spreadPercent}% vs Comp-Set)`
                  : rateSpread < -15
                  ? `Value Capture Opportunity: Rate Runway Available (-${Math.abs(Number(spreadPercent))}% vs Comp-Set)`
                  : `Optimal Equilibrium: Parity Aligned with Comp-Set Median`
                }
              </h4>
              
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {rateSpread > 15 
                  ? `${myHotel.name} is priced $${rateSpread} above the comp-set average ($${compSetAvgRate}). With Addis corporate demand high, maintain this rate ceiling while protecting direct bookers with exclusive dining or airport transfer perks.`
                  : rateSpread < -15
                  ? `${myHotel.name} is currently priced $${Math.abs(rateSpread)} below competitor median ($${compSetAvgRate}). You have room to step up your ADR by +10% to +14% without shedding booking volume.`
                  : `${myHotel.name} is priced in close proximity to the comp-set average ($${compSetAvgRate}). Shift focus to winning direct share over Booking.com and Expedia via closed-user loyalty perks.`
                }
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenAuditModal?.(`Full Comp-Set Analysis Report for ${myHotel.name}`)}
                className="px-5 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Book Comp-Set Strategy Session
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
