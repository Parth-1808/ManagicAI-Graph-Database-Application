'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip 
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';
import { EarningsBreakdownItem } from '@/types';

export interface EarningsDonutChartProps {
  data: EarningsBreakdownItem[];
  timeframe: 'monthly' | 'yearly';
  onTimeframeChange: (timeframe: 'monthly' | 'yearly') => void;
  totalRevenueDisplay: string;
}

export const EarningsDonutChart: React.FC<EarningsDonutChartProps> = ({
  data,
  timeframe,
  onTimeframeChange,
  totalRevenueDisplay,
}) => {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-5">
      {/* Header & Switcher */}
      <div className="flex items-center justify-between gap-2 border-b border-purple-50 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100/70 text-purple-700">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Revenue Stream Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Distribution across Endorsements, Film Retainers &amp; Galas
            </p>
          </div>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center p-1 bg-purple-50 rounded-xl border border-purple-100">
          <button
            type="button"
            onClick={() => onTimeframeChange('monthly')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              timeframe === 'monthly'
                ? 'bg-white text-purple-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => onTimeframeChange('yearly')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              timeframe === 'yearly'
                ? 'bg-white text-purple-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Annual ARR
          </button>
        </div>
      </div>

      {/* Donut Chart & Breakdown Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Recharts Donut */}
        <div className="md:col-span-5 relative h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e9d5ff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Total Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Run</span>
            <span className="text-base sm:text-lg font-black text-slate-900">{totalRevenueDisplay}</span>
          </div>
        </div>

        {/* Detailed Stream List */}
        <div className="md:col-span-7 space-y-2">
          {data.map((stream, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-slate-50/70 hover:bg-purple-50/60 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: stream.color }}
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {stream.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {stream.percent}% Share of Total
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-extrabold text-slate-900">
                  {stream.display}
                </div>
                <div className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stream.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
