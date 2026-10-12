import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Activity, 
  Compass, 
  Clock, 
  MapPin, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ADDIS_MARKET_SNAPSHOT } from '../data/hospitalityData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MarketIntelligenceProps {
  onOpenAuditModal?: () => void;
}

export default function MarketIntelligence({ onOpenAuditModal }: MarketIntelligenceProps) {
  const [activeMetricTab, setActiveMetricTab] = useState<'adr' | 'occ' | 'revpar'>('adr');

  // Month labels
  const months12 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Historical & projected data for Addis Ababa
  const adrData = [118, 142, 134, 126, 122, 115, 108, 112, 128, 136, 148, 155];
  const occData = [62, 78, 69, 65, 63, 58, 52, 54, 64, 71, 76, 74];
  const revparData = adrData.map((adr, i) => Math.round(adr * (occData[i] / 100)));

  // Current active dataset with Royal Blue & Cyan brand colors
  const getActiveChartData = () => {
    if (activeMetricTab === 'adr') {
      return {
        labels: months12,
        datasets: [
          {
            label: 'Addis Ababa Market ADR ($)',
            data: adrData,
            borderColor: '#1E6BFF',
            backgroundColor: 'rgba(30, 107, 255, 0.08)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#1E6BFF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'East Africa Regional Benchmark ($)',
            data: [98, 102, 104, 105, 101, 99, 95, 96, 102, 106, 108, 110],
            borderColor: '#94A3B8',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            tension: 0.35,
            pointRadius: 2,
          }
        ]
      };
    } else if (activeMetricTab === 'occ') {
      return {
        labels: months12,
        datasets: [
          {
            label: 'Market Occupancy (%)',
            data: occData,
            borderColor: '#00D2FF',
            backgroundColor: 'rgba(0, 210, 255, 0.08)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#00D2FF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      };
    } else {
      return {
        labels: months12,
        datasets: [
          {
            label: 'Addis Ababa RevPAR ($)',
            data: revparData,
            borderColor: '#0284C7',
            backgroundColor: 'rgba(2, 132, 199, 0.08)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#0284C7',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      };
    }
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#475569',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' },
          boxWidth: 14,
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#00D2FF',
        bodyColor: '#FFFFFF',
        borderColor: '#1E6BFF',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#64748B', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.7)' },
        ticks: { color: '#64748B', font: { size: 11 } }
      }
    }
  };

  return (
    <section id="market-intelligence" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
              Macro Hospitality Analytics · Horn of Africa
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Market Intelligence Dashboard
            </h2>
            <p className="mt-2 text-slate-600 text-base leading-relaxed">
              Real-time aggregated hospitality intelligence across Addis Ababa, regional secondary cities (Hawassa, Bishoftu, Bahir Dar), and East African gateway hubs. Benchmark your property against actual transaction pace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500 font-mono font-semibold">Tracking 9,850+ Keys</div>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Request Custom Market Report
            </button>
          </div>
        </div>

        {/* 4 Dashboard Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Addis Ababa Market ADR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#1E6BFF]" />
                Addis Ababa Market ADR
              </span>
              <span className="text-emerald-600 font-mono font-bold">{ADDIS_MARKET_SNAPSHOT.yoyAdrGrowth} YoY</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 mt-3">
              ${ADDIS_MARKET_SNAPSHOT.currentMarketADR} <span className="text-xs font-normal text-slate-500">USD</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
              <span>Equivalent:</span>
              <span className="font-mono text-[#1E6BFF] font-semibold">~{(ADDIS_MARKET_SNAPSHOT.currentMarketADR * 142.5).toFixed(0)} ETB</span>
            </div>
          </div>

          {/* Card 2: Regional Market ADR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Compass className="w-3.5 h-3.5 text-[#00D2FF]" />
                Regional Market ADR
              </span>
              <span className="text-slate-400 font-mono font-medium">East Africa</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-800 mt-3">
              ${ADDIS_MARKET_SNAPSHOT.regionalMarketADR} <span className="text-xs font-normal text-slate-500">USD</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
              <span>Addis Premium:</span>
              <span className="font-mono text-emerald-600 font-bold">+23.5% vs Region</span>
            </div>
          </div>

          {/* Card 3: Demand Trend & Index */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                Demand Index
              </span>
              <span className="text-emerald-600 font-mono font-bold">Strong High</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 mt-3">
              {ADDIS_MARKET_SNAPSHOT.demandIndex} <span className="text-xs font-normal text-slate-500">/ 100 Base</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
              <span>City Occupancy:</span>
              <span className="font-mono text-slate-900 font-semibold">{ADDIS_MARKET_SNAPSHOT.currentOccupancy}% avg</span>
            </div>
          </div>

          {/* Card 4: Booking Window Trend */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Booking Window Trend
              </span>
              <span className="text-amber-600 font-mono font-bold">Compressing</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 mt-3">
              {ADDIS_MARKET_SNAPSHOT.bookingWindowAvg} <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
              <span>62% of corporate arrivals:</span>
              <span className="font-mono text-slate-700">&lt; 7 Days lead</span>
            </div>
          </div>

        </div>

        {/* Interactive Charts Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hospitality Performance Trends & Seasonality</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Full 12-month trailing cycle showcasing diplomatic summits (February peak) and leisure diaspora inflows.
              </p>
            </div>

            {/* Metric Toggle Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl self-start sm:self-auto">
              {[
                { id: 'adr', label: 'ADR Trend ($)' },
                { id: 'occ', label: 'Occupancy Trend (%)' },
                { id: 'revpar', label: 'RevPAR Trend ($)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMetricTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeMetricTab === tab.id
                      ? 'bg-white text-[#1E6BFF] shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Viewport */}
          <div className="h-72 sm:h-80 w-full">
            <Line data={getActiveChartData()} options={chartOptions} />
          </div>

          {/* Market Segmentation Breakdown Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="text-xs uppercase tracking-wider text-[#1E6BFF] font-bold mb-3">
              Addis Ababa Guest Segmentation Mix (Annual Average)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ADDIS_MARKET_SNAPSHOT.marketSegments.map((seg, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 truncate font-medium">{seg.name}</div>
                  <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">{seg.share}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
