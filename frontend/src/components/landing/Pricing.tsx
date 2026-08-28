'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Launchpad',
      tagline: 'For emerging D2C brands & creators',
      priceMonthly: 4999,
      priceAnnual: 3999,
      adSpendLimit: 'Up to ₹3,00,000 / mo Ad Spend',
      badge: 'Starter',
      popular: false,
      features: [
        'Hinglish & 6 Regional Languages GenAI',
        'Meta & Google Ads Automation',
        'WhatsApp Drop-Off Cart Recovery (1,000 nudges/mo)',
        'Basic Attribution Dashboard',
        'Email & Chat Support',
      ],
      buttonText: 'Start Free 14-Day Trial',
    },
    {
      name: 'Growth Scale OS',
      tagline: 'For fast-growing brands replacing agencies',
      priceMonthly: 19999,
      priceAnnual: 15999,
      adSpendLimit: 'Up to ₹25,00,000 / mo Ad Spend',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Everything in Launchpad +',
        'Autonomous Media Buyer Swarm (45s Bidding)',
        '1st-Party Knowledge Graph Attribution (99.4% Match)',
        '12 Indian Languages + Regional Persona Generator',
        'WhatsApp Full Native Commerce & UPI Checkout Links',
        'Festive & IPL Match Surge AI Predictor',
        'Sub-Minute ROAS Bleed Prevention Guardrails',
        'Priority 24/7 Slack / WhatsApp Support',
      ],
      buttonText: 'Deploy Growth OS',
    },
    {
      name: 'Enterprise Titan',
      tagline: 'For large conglomerates & high-volume retail',
      priceMonthly: 49999,
      priceAnnual: 39999,
      adSpendLimit: 'Unlimited Monthly Ad Spend',
      badge: 'Custom OS',
      popular: false,
      features: [
        'Everything in Growth Scale +',
        'Custom Fine-Tuned AI Models on Your Brand Voice',
        'Quick Commerce (Zepto/Blinkit/Swiggy) Sync',
        'Custom ERP / SAP & Warehouse Stock-Aware Bidding',
        'Dedicated Senior Performance Strategist',
        'Custom Data Residency & Security SLAs (SOC2/ISO)',
      ],
      buttonText: 'Schedule Executive Demo',
    },
  ];

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(p);
  };

  return (
    <section id="pricing" className="py-24 bg-slate-950/90 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <Zap className="h-3.5 w-3.5 mr-1" />
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fraction of an Agency Fee. 10x the Performance.
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            All plans include a 14-day zero-risk trial. Cancel anytime with a single click.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-7 bg-slate-800 rounded-full p-1 transition-colors relative border border-slate-700 focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full bg-orange-500 transition-transform duration-200 ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-medium flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual</span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[10px] py-0 px-1.5">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <Card
                key={plan.name}
                className={`flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-slate-900 border-orange-500 shadow-2xl shadow-orange-500/10 scale-105 z-10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs px-3 py-1 shadow-md border-0">
                      ⚡ MOST POPULAR ACROSS D2C
                    </Badge>
                  </div>
                )}

                <CardHeader className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">{plan.name}</span>
                    <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">
                      {plan.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 min-h-[32px]">{plan.tagline}</p>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {formatPrice(price)}
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <div className="text-[11px] text-orange-400 font-semibold mt-1">
                      {plan.adSpendLimit}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-3 flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    What&apos;s Included:
                  </div>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    size="lg"
                    className={`w-full text-xs font-bold rounded-xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                    onClick={() => alert(`Starting 14-day free trial on plan: ${plan.name}`)}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
