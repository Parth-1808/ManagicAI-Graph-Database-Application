'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  MessageSquare,
  Database,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Autonomous Media Buyer Swarm',
    desc: 'Never manually tweak Meta & Google bids again. Intelligent agents analyze conversion signals every 45s and shift capital to top-performing ad sets.',
    icon: Bot,
    badge: 'Core Engine',
    color: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
  },
  {
    title: 'Unified Customer & Attribution Graph',
    desc: 'Bypasses iOS 14.5 and cookie deprecation by building a deterministic 1st-party graph connecting clicks, phone numbers, and UPI orders.',
    icon: Database,
    badge: 'Graph DB Layer',
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Hinglish & 12 Regional Language GenAI',
    desc: 'Generate culturally authentic ad copy and video hooks in Hindi, Hinglish, Tamil, Telugu, Marathi, Kannada, and Bengali tailored to Tier 2/3 markets.',
    icon: Sparkles,
    badge: 'India Specific',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    title: 'WhatsApp Native Commerce Engine',
    desc: 'Direct click-to-WhatsApp ads with automated product catalogs, instant UPI payment links, and abandoned cart recovery with 68% conversion rates.',
    icon: MessageSquare,
    badge: 'High Conversion',
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    title: 'Festival & Cricket Surge Predictor',
    desc: 'Pre-trains ad budgets for IPL matches, Diwali sales, Big Billion Days, and regional holidays with dynamic inventory-aware bidding.',
    icon: Zap,
    badge: 'Predictive AI',
    color: 'from-rose-500/20 to-red-500/20',
    iconColor: 'text-rose-400',
  },
  {
    title: 'Real-Time ROAS Bleed Prevention',
    desc: 'Instant guardrails pause fatigue-ridden ads within 30 minutes of CPA spikes, ensuring zero wasted spend on dying creatives.',
    icon: ShieldCheck,
    badge: 'Risk Control',
    color: 'from-amber-500/20 to-yellow-500/20',
    iconColor: 'text-amber-400',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <Layers className="h-3.5 w-3.5 mr-1" />
            Operating System Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Modern High-Growth Marketing
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Every module is tightly integrated into a single cognitive graph that learns and executes 24/7 without manual intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Card className="bg-slate-900/60 border-slate-800 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 h-full flex flex-col justify-between group">
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="border-slate-700 bg-slate-950 text-slate-300 text-[10px]">
                        {item.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="text-[11px] font-semibold text-orange-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore module capabilities</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
