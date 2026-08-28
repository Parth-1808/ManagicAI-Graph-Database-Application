'use client';

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const timeSeriesData = [
  { day: 'Day 1', traditional: 2.1, coworkAi: 2.2, spend: '₹25,000' },
  { day: 'Day 5', traditional: 2.3, coworkAi: 3.1, spend: '₹1,20,000' },
  { day: 'Day 10', traditional: 2.0, coworkAi: 3.8, spend: '₹2,50,000' },
  { day: 'Day 15', traditional: 2.2, coworkAi: 4.2, spend: '₹4,10,000' },
  { day: 'Day 20', traditional: 2.1, coworkAi: 4.6, spend: '₹6,30,000' },
  { day: 'Day 25', traditional: 1.9, coworkAi: 4.9, spend: '₹8,90,000' },
  { day: 'Day 30', traditional: 2.2, coworkAi: 5.3, spend: '₹12,50,000' },
];

const channelBreakdown = [
  { channel: 'WhatsApp Commerce', revenue: 42, roas: '5.8x', cac: '₹140' },
  { channel: 'Meta Reels & Ads', revenue: 35, roas: '4.9x', cac: '₹210' },
  { channel: 'Google PMax', revenue: 28, roas: '4.3x', cac: '₹260' },
  { channel: 'Quick Commerce (Zepto/Blinkit)', revenue: 19, roas: '5.1x', cac: '₹110' },
  { channel: 'Influencer GenAI Whitelist', revenue: 14, roas: '4.6x', cac: '₹190' },
];

export const LiveAnalyticsDashboard: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '90D'>('30D');

  return (
    <section id="analytics" className="py-24 bg-slate-950/90 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            Verified Multi-Channel Performance
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Guessing. Watch Real-Time ROAS Scale.
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Cowork AI eliminates marketing waste by automatically shifting ad budgets to the highest-converting regional channels in sub-minute intervals.
          </p>
        </div>

        {/* Metric Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/60 border-slate-800 p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400">Blended ROAS</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px] flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> +142% vs Agency
              </Badge>
            </div>
            <div className="text-3xl font-extrabold text-white">4.82x</div>
            <p className="text-[11px] text-slate-400 mt-1">Industry average sits at 2.1x across Indian D2C</p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400">Customer Acquisition Cost (CAC)</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px] flex items-center">
                -44% Reduced
              </Badge>
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">₹182.50</div>
            <p className="text-[11px] text-slate-400 mt-1">Down from ₹328.00 through auto-funnel repair</p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400">Hours Saved / Week</span>
              <Badge className="bg-orange-500/20 text-orange-300 border-0 text-[10px]">
                Autonomous Ops
              </Badge>
            </div>
            <div className="text-3xl font-extrabold text-orange-400">38.5 hrs</div>
            <p className="text-[11px] text-slate-400 mt-1">Zero manual copy writing, bidding, or reporting</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart */}
          <Card className="lg:col-span-2 bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <CardTitle className="text-base font-bold text-white">
                    ROAS Trajectory: Cowork AI vs. Traditional Agencies
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 mt-1">
                    Continuous reinforcement learning improves returns over 30 days
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                  {(['7D', '30D', '90D'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveRange(range)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        activeRange === range ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="coworkAiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="tradGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit="x" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="coworkAi" 
                      name="Cowork AI OS (ROAS)" 
                      stroke="#f97316" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#coworkAiGrad)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="traditional" 
                      name="Agency / Manual (ROAS)" 
                      stroke="#64748b" 
                      strokeWidth={2} 
                      strokeDasharray="4 4" 
                      fillOpacity={1} 
                      fill="url(#tradGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400 mt-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                <span>Cowork AI Autonomous Loop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                <span>Standard Static Media Buying</span>
              </div>
            </div>
          </Card>

          {/* Channel Breakdown */}
          <Card className="bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <CardTitle className="text-base font-bold text-white mb-1">
                Indian Channel ROAS Breakdown
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mb-4">
                Real-time attribution across top consumer channels
              </CardDescription>

              <div className="space-y-3.5">
                {channelBreakdown.map((item) => (
                  <div key={item.channel} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="font-semibold text-white">{item.channel}</span>
                      <span className="font-bold text-orange-400">{item.roas} ROAS</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5 rounded-full" 
                        style={{ width: `${item.revenue * 2}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Share: {item.revenue}%</span>
                      <span>Avg CAC: <span className="text-emerald-400 font-medium">{item.cac}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4 text-xs border-slate-700 hover:bg-slate-800 text-slate-200"
              onClick={() => alert("Exporting multi-touch attribution report...")}
            >
              Export Complete Attribution CSV
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
