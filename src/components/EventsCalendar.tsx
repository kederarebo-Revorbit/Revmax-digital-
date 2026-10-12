import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/hospitalityData';
import { EventItem } from '../types';

interface EventsCalendarProps {
  onOpenAuditModal?: (title?: string) => void;
}

export default function EventsCalendar({ onOpenAuditModal }: EventsCalendarProps) {
  const [selectedImpact, setSelectedImpact] = useState<'All' | 'High' | 'Medium'>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventItem>(UPCOMING_EVENTS[0]);

  const filteredEvents = UPCOMING_EVENTS.filter((ev) => {
    if (selectedImpact === 'All') return true;
    return ev.demandImpact === selectedImpact;
  });

  const getImpactBadge = (impact: EventItem['demandImpact']) => {
    switch (impact) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            High Demand Compression
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Medium Demand Surge
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Base Demand
          </span>
        );
    }
  };

  return (
    <section id="events-calendar" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
              Compression Forecasting · MICE & Diplomatic Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Addis Ababa Events & Demand Calendar
            </h2>
            <p className="mt-2 text-slate-600 text-base leading-relaxed">
              Predictive calendar tracking major conferences, African Union summits, UNECA ministerial forums, and trade exhibitions. Capitalize on citywide sell-outs with revenue strategies that maximize RevPAR.
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl self-start lg:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            {(['All', 'High', 'Medium'] as const).map((impact) => (
              <button
                key={impact}
                onClick={() => setSelectedImpact(impact)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedImpact === impact
                    ? 'bg-[#1E6BFF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {impact === 'All' ? 'All Events' : `${impact} Impact`}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Events List + Detailed Strategy Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Event Cards */}
          <div className="lg:col-span-7 space-y-4">
            {filteredEvents.map((event) => {
              const isSelected = selectedEvent.id === event.id;
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#1E6BFF] shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-mono text-[#1E6BFF] font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.dates}</span>
                    </div>
                    <div>{getImpactBadge(event.demandImpact)}</div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {event.name}
                  </h3>

                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {event.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {event.attendeesEstimate}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Organized by <strong className="text-slate-700 font-semibold">{event.organization}</strong>
                    </span>
                    <span className="text-[#1E6BFF] font-bold flex items-center gap-1">
                      View Strategy <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Strategy Blueprint */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D2FF] mb-2 font-semibold">
                <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                <span>RECOMMENDED REVENUE STRATEGY BLUEPRINT</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {selectedEvent.name}
              </h3>
              <div className="text-xs text-slate-300 mt-1 font-mono">
                {selectedEvent.dates}
              </div>

              <div className="mt-6 space-y-4">
                {/* 1. ADR Recommendation */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider">
                    1. Pricing Strategy (ADR Action)
                  </div>
                  <div className="text-sm text-slate-200 font-medium mt-1">
                    {selectedEvent.recommendedStrategy.adrAction}
                  </div>
                </div>

                {/* 2. Minimum Stay Restriction */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    2. Length of Stay (MLOS / CTA Restriction)
                  </div>
                  <div className="text-sm text-slate-200 font-medium mt-1">
                    {selectedEvent.recommendedStrategy.restriction}
                  </div>
                </div>

                {/* 3. Inventory Strategy */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    3. Distribution & Inventory Pacing
                  </div>
                  <div className="text-sm text-slate-200 font-medium mt-1">
                    {selectedEvent.recommendedStrategy.inventoryPacing}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => onOpenAuditModal?.(`${selectedEvent.name} Compression Yield Plan`)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-[#00D2FF] text-xs font-bold rounded-xl transition-colors border border-white/15 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Deploy Strategy for {selectedEvent.name.slice(0, 24)}</span>
                </button>

                <button
                  onClick={() => onOpenAuditModal?.(`AU Summit & ${selectedEvent.name} Compression Strategy`)}
                  className="w-full py-2.5 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  Schedule Event Yield Optimization Call
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
