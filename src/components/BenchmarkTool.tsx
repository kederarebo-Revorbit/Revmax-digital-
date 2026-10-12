import { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  DollarSign, 
  Percent, 
  Sliders 
} from 'lucide-react';
import { ADDIS_MARKET_SNAPSHOT } from '../data/hospitalityData';

interface BenchmarkToolProps {
  onOpenAuditModal?: () => void;
}

export default function BenchmarkTool({ onOpenAuditModal }: BenchmarkToolProps) {
  // Inputs
  const [userRooms, setUserRooms] = useState<number>(85);
  const [userAdr, setUserAdr] = useState<number>(98);
  const [userOcc, setUserOcc] = useState<number>(58);

  // Calculations
  const userRevPAR = userAdr * (userOcc / 100);
  const marketAdr = ADDIS_MARKET_SNAPSHOT.currentMarketADR;
  const marketOcc = ADDIS_MARKET_SNAPSHOT.currentOccupancy;
  const marketRevPAR = ADDIS_MARKET_SNAPSHOT.marketRevPAR;

  // Indices (100 = Market Parity)
  const adrIndex = ((userAdr / marketAdr) * 100).toFixed(1);
  const occIndex = ((userOcc / marketOcc) * 100).toFixed(1);
  const revparIndex = ((userRevPAR / marketRevPAR) * 100).toFixed(1);

  // Monthly Revenue Gap
  const userMonthlyRev = userRooms * 30 * (userOcc / 100) * userAdr;
  const potentialMonthlyRev = userRooms * 30 * (marketOcc / 100) * marketAdr;
  const monthlyRevenueGap = potentialMonthlyRev - userMonthlyRev;
  const annualOpportunity = monthlyRevenueGap * 12;

  return (
    <section id="benchmark" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Competitive Indexing · Market Penetration Index (MPI / ARI / RGI)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hotel Performance Benchmark Tool
          </h2>
          <p className="mt-2 text-slate-600 text-base leading-relaxed">
            Compare your property's operational ADR, Occupancy, and RevPAR directly against market medians for Addis Ababa and East Africa. Discover untapped revenue left on the table.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#1E6BFF]" />
                <span>Enter Your Hotel Metrics</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">30-Day Period</span>
            </div>

            {/* Total Rooms */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                <span>Total Available Rooms</span>
                <span className="font-mono text-[#1E6BFF] font-bold">{userRooms} rooms</span>
              </div>
              <input
                type="range"
                min="15"
                max="350"
                step="5"
                value={userRooms}
                onChange={(e) => setUserRooms(Number(e.target.value))}
                className="w-full accent-[#1E6BFF] cursor-pointer"
              />
            </div>

            {/* User ADR */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                <span>Your Average Daily Rate (ADR)</span>
                <span className="font-mono text-[#1E6BFF] font-bold">${userAdr} USD</span>
              </div>
              <input
                type="range"
                min="35"
                max="300"
                step="2"
                value={userAdr}
                onChange={(e) => setUserAdr(Number(e.target.value))}
                className="w-full accent-[#1E6BFF] cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                Market Average: <strong className="text-slate-800 font-mono">${marketAdr}</strong>
              </div>
            </div>

            {/* User Occupancy */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1.5">
                <span>Your Average Occupancy (%)</span>
                <span className="font-mono text-[#1E6BFF] font-bold">{userOcc}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="98"
                step="1"
                value={userOcc}
                onChange={(e) => setUserOcc(Number(e.target.value))}
                className="w-full accent-[#1E6BFF] cursor-pointer"
              />
              <div className="text-[11px] text-slate-500 mt-1">
                Market Average: <strong className="text-emerald-600 font-mono">{marketOcc}%</strong>
              </div>
            </div>

            {/* Revenue Opportunity Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <div className="text-xs text-slate-700 font-semibold">Annual Uncaptured Revenue Opportunity:</div>
              <div className="text-2xl font-extrabold font-mono text-[#1E6BFF] mt-1">
                {annualOpportunity > 0 ? (
                  <>+${annualOpportunity.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-normal text-slate-600">USD/yr</span></>
                ) : (
                  <span className="text-emerald-700">Outperforming Market Benchmark</span>
                )}
              </div>
              <div className="text-[11px] text-slate-600 mt-1 font-medium">
                {annualOpportunity > 0
                  ? `Equivalent to ~${((annualOpportunity * 142.5) / 1000000).toFixed(1)} Million ETB in additional gross profit.`
                  : 'Your property maintains pricing leadership in this tier.'}
              </div>
            </div>

            <button
              onClick={onOpenAuditModal}
              className="w-full py-3 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Request Custom Comp-Set Audit
            </button>
          </div>

          {/* Outputs Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* ADR Comparison */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">ADR (ARI Index)</div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  ${userAdr} <span className="text-xs font-normal text-slate-400">vs ${marketAdr}</span>
                </div>
                <div className={`text-xs font-mono font-bold mt-2 flex items-center gap-1 ${Number(adrIndex) >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <span>ARI: {adrIndex}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({Number(adrIndex) >= 100 ? 'Above' : 'Below'})</span>
                </div>
              </div>

              {/* Occupancy Comparison */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Occupancy (MPI Index)</div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  {userOcc}% <span className="text-xs font-normal text-slate-400">vs {marketOcc}%</span>
                </div>
                <div className={`text-xs font-mono font-bold mt-2 flex items-center gap-1 ${Number(occIndex) >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <span>MPI: {occIndex}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({Number(occIndex) >= 100 ? 'Above' : 'Below'})</span>
                </div>
              </div>

              {/* RevPAR Comparison */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">RevPAR (RGI Index)</div>
                <div className="text-2xl font-bold font-mono text-[#1E6BFF] mt-1">
                  ${userRevPAR.toFixed(2)} <span className="text-xs font-normal text-slate-400">vs ${marketRevPAR.toFixed(2)}</span>
                </div>
                <div className={`text-xs font-mono font-bold mt-2 flex items-center gap-1 ${Number(revparIndex) >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <span>RGI: {revparIndex}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({Number(revparIndex) >= 100 ? 'Leading' : 'Lagging'})</span>
                </div>
              </div>

            </div>

            {/* AI Strategic Recommendations Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1E6BFF] mb-3 font-bold">
                <Sparkles className="w-4 h-4 text-[#1E6BFF]" />
                <span>AI COMMERCIAL ACTION RECOMMENDATIONS</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Tailored Yield Levers for Your Performance Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Recommendation 1: Improve Pricing */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-[#1E6BFF] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1E6BFF]" />
                    <span>Improve Pricing Architecture</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {userAdr < marketAdr
                      ? `Your ADR ($${userAdr}) is ${Math.round(marketAdr - userAdr)} below city baseline. Implement dynamic day-of-week pricing and establish 3 distinct rate fences (Non-Refundable, Flexible, Corporate MICE).`
                      : 'Your ADR is strong. Protect yield on mid-week dates with length-of-stay minimums and optimize executive suite pricing.'}
                  </p>
                </div>

                {/* Recommendation 2: Increase Visibility */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-[#0284C7] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Increase Metasearch Visibility</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Activate Google Free Booking Links and Google Hotel Ads metasearch to capture international travelers searching flights via Ethiopian Airlines before OTAs intercept them.
                  </p>
                </div>

                {/* Recommendation 3: Optimize OTA Mix */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Optimize OTA Channel Mix</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Balance high-commission channels. Deepen exposure on Trip.com for Chinese diplomatic arrivals, Booking.com for European NGO travelers, while driving 30%+ to direct booking engine.
                  </p>
                </div>

                {/* Recommendation 4: Enhance Reviews */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Enhance Reviews & Reputation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 0.5 improvement on Google Reviews correlates with an immediate 9% increase in booking conversion. Implement automated post-checkout WhatsApp review requests.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
