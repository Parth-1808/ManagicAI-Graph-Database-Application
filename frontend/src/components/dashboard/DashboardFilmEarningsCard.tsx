'use client';

import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { useWorkStore } from '@/store/useWorkStore';

export const DashboardFilmEarningsCard: React.FC = () => {
  const { filmsList, fetchOverviewSummary, isLoadingOverview } = useWorkStore();
  const [filter, setFilter] = useState<'all' | 'in_production' | 'released'>('all');

  useEffect(() => {
    if (filmsList.length === 0) {
      fetchOverviewSummary();
    }
  }, [filmsList.length, fetchOverviewSummary]);

  const filteredFilms = filmsList.filter((film) => {
    if (filter === 'in_production') return film.status === 'In Production' || film.status === 'Upcoming';
    if (filter === 'released') return film.status === 'Released';
    return true;
  });

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-5 sm:p-6 shadow-[0_10px_35px_rgba(99,102,241,0.06)] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <Film className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Filmography &amp; Box Office Earnings
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Key film projects and earnings fetched live from CognoDB.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'all' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({filmsList.length})
          </button>
          <button
            onClick={() => setFilter('in_production')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'in_production' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('released')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'released' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hits
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoadingOverview && filmsList.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-purple-950/10 min-h-[260px] p-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="h-5 w-20 bg-purple-200/50 rounded-full" />
                <div className="h-5 w-12 bg-purple-200/50 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-3/4 bg-purple-200/60 rounded-full" />
                <div className="h-4 w-1/2 bg-purple-200/40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Clean Movie Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group relative rounded-2xl overflow-hidden min-h-[260px] flex flex-col justify-between p-4 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 bg-slate-950"
          >
            {/* Full-Bleed Photo */}
            <img
              src={film.image}
              alt={film.title}
              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none"
            />

            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/20 group-hover:via-slate-950/70 transition-all duration-300" />

            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide ${film.statusColor}`}>
                {film.statusBadge}
              </span>
              <span className="text-[11px] font-mono font-bold text-white/90 drop-shadow">
                {film.year}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-1.5 pt-6">
              <div>
                <h3 className="text-lg font-black text-white leading-tight tracking-tight drop-shadow">
                  {film.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {film.role} • <span className="text-slate-400">{film.studio}</span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-1 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block font-sans">Payday</span>
                  <span className="text-emerald-400 font-black text-sm">{film.payday}</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="text-slate-400 text-[10px] block font-sans">Box Office</span>
                  <span className="text-white font-extrabold text-sm">{film.boxOffice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};