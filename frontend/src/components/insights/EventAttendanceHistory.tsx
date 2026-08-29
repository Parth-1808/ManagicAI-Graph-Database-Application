'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useWorkStore } from '@/store/useWorkStore';

export const EventAttendanceHistory: React.FC = () => {
  const { eventHistory, fetchIntelligenceInsights } = useWorkStore();
  const [filter, setFilter] = useState<'all' | '2026' | 'attended'>('all');

  useEffect(() => {
    if (eventHistory.length === 0) {
      fetchIntelligenceInsights();
    }
  }, [eventHistory.length, fetchIntelligenceInsights]);

  const filteredEvents = eventHistory.filter((evt: any) => {
    if (filter === '2026') return evt.year === '2026';
    if (filter === 'attended') return evt.status === 'Attended' || evt.status === 'completed';
    return true;
  });

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-5">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100/70 text-purple-700">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              VIP Festival &amp; Global Gala Attendance
            </h3>
            <p className="text-xs text-slate-500">
              International red carpet itineraries, high-jewelry styling &amp; press attribution (Live CognoDB)
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-purple-50 rounded-xl border border-purple-100 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-purple-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Events ({eventHistory.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('2026')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filter === '2026'
                ? 'bg-white text-purple-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            2026 Itineraries
          </button>
          <button
            type="button"
            onClick={() => setFilter('attended')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filter === 'attended'
                ? 'bg-white text-purple-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Past Attended
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {(!filteredEvents || filteredEvents.length === 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-purple-100 bg-white/60 h-64 p-4 flex flex-col justify-between">
              <div className="h-28 bg-purple-200/50 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-purple-200/60 rounded-full" />
                <div className="h-3 w-1/2 bg-purple-200/40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((evt: any) => (
          <div
            key={evt.id}
            className="rounded-2xl border border-purple-100 bg-white/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
          >
            {/* Event Header & Banner Image */}
            <div className="relative h-36 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={evt.image}
                alt={evt.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-3 right-3">
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${evt.badgeColor}`}
                >
                  {evt.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="text-sm font-black truncate leading-snug drop-shadow-sm">
                  {evt.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-200 mt-0.5">
                  <MapPin className="h-3 w-3 text-purple-300 shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-bold text-slate-800">{evt.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Press Reach:</span>
                  <span className="font-bold text-purple-700">{evt.reach}</span>
                </div>
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Styling: </span>
                  <span>{evt.styling}</span>
                </div>
              </div>

              {/* Press Outlets */}
              <div className="pt-2 border-t border-purple-50 flex flex-wrap gap-1">
                {(evt.pressOutlets || []).map((outlet: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-100"
                  >
                    {outlet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
