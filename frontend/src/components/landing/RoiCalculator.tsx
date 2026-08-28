'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type BusinessType = 'd2c' | 'b2b' | 'qcommerce' | 'agency';

export const RoiCalculator: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(300000); // Default ₹3 Lakhs/month
  const [businessType, setBusinessType] = useState<BusinessType>('d2c');

  // Multipliers based on business type
  const multipliers: Record<BusinessType, { baselineRoas: number; coworkRoas: number; agencyFee: number }> = {
    d2c: { baselineRoas: 2.1, coworkRoas: 4.8, agencyFee: 0.15 },
    b2b: { baselineRoas: 2.4, coworkRoas: 5.2, agencyFee: 0.18 },
    qcommerce: { baselineRoas: 2.8, coworkRoas: 5.9, agencyFee: 0.12 },
    agency: { baselineRoas: 2.2, coworkRoas: 4.9, agencyFee: 0.20 },
  };

  const current = multipliers[businessType];
  const baselineRevenue = adSpend * current.baselineRoas;
  const coworkRevenue = adSpend * current.coworkRoas;
  const extraRevenue = coworkRevenue - baselineRevenue;
  const agencyFeesSaved = Math.max(35000, adSpend * current.agencyFee);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <Calculator className="h-3.5 w-3.5 mr-1" />
            Interactive ROI Calculator
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Revenue Upside With Cowork AI
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Adjust your monthly marketing budget to see the direct revenue lift and cost savings from autonomous ad operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Controls Form */}
          <Card className="lg:col-span-6 bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Industry / Model
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'd2c' as const, label: 'D2C E-Commerce' },
                    { id: 'b2b' as const, label: 'B2B SaaS / Services' },
                    { id: 'qcommerce' as const, label: 'Quick Commerce' },
                    { id: 'agency' as const, label: 'Marketing Agency' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBusinessType(item.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                        businessType === item.id
                          ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Input */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Monthly Ad Spend
                  </label>
                  <span className="text-xl font-extrabold text-orange-400 font-mono">
                    {formatINR(adSpend)}
                  </span>
                </div>

                <input
                  type="range"
                  min="50000"
                  max="3000000"
                  step="25000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />

                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                  <span>₹50,000/mo</span>
                  <span>₹15,00,000/mo</span>
                  <span>₹30,00,000/mo</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Current Baseline ROAS:</span>
                  <span className="font-semibold text-slate-300">{current.baselineRoas}x</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Projected Cowork AI ROAS:</span>
                  <span className="font-bold text-orange-400">{current.coworkRoas}x</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4">
              *Calculations based on aggregate performance data from 1,200+ Indian active brand campaigns.
            </p>
          </Card>

          {/* Result Output Card */}
          <Card className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 border-orange-500/30 p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute top-4 right-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                ⚡ +140% Net Efficiency
              </Badge>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Projected Monthly Revenue
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 text-orange-400">
                {formatINR(coworkRevenue)}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Incremental Monthly Lift:</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">
                    +{formatINR(extraRevenue)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Agency Retainers Replaced:</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {formatINR(agencyFeesSaved)}/mo
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Ops Hours Saved / Month:</span>
                  <span className="text-sm font-bold text-orange-300 font-mono">
                    150+ Hours
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 rounded-xl group"
                onClick={() => window.location.href = '#pricing'}
              >
                <span>Deploy Cowork AI For Your Brand</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
