'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    quote: "We scaled our monthly ad spend from ₹4 Lakhs to ₹32 Lakhs on Meta and WhatsApp in just 90 days. Cowork AI's Hinglish creative generator and autonomous budget rebalancing gave us a consistent 5.2x ROAS during Diwali.",
    author: "Rohan Verma",
    role: "Founder & CEO, VedaHerbs D2C",
    location: "Mumbai",
    metric: "5.2x ROAS (from 2.1x)",
    avatar: "RV",
  },
  {
    quote: "The WhatsApp commerce and UPI recovery agent alone recovered ₹18 Lakhs in lost checkouts last month. We completely fired our legacy performance marketing agency and never looked back.",
    author: "Sneha Reddy",
    role: "Head of Growth, UrbanThreads",
    location: "Hyderabad",
    metric: "₹18L Checkout Recovery",
    avatar: "SR",
  },
  {
    quote: "Attribution in India was broken after iOS 14.5. Cowork AI's first-party knowledge graph resolved 99.4% of our customer journeys across Blinkit, Instagram, and Website. It's truly an OS for marketing.",
    author: "Aditya Nair",
    role: "CMO, NutriQuick Foods",
    location: "Bengaluru",
    metric: "-48% Blended CAC",
    avatar: "AN",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <Star className="h-3.5 w-3.5 mr-1 fill-amber-400" />
            Backed by 1,200+ Indian Brands
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by the Fastest Growing Brands in India
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            See how top D2C, B2B SaaS, and quick-commerce companies replace manual agencies with autonomous marketing intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="bg-slate-900/60 border-slate-800 p-6 h-full flex flex-col justify-between hover:border-orange-500/30 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] font-bold">
                      {item.metric}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.author}</div>
                    <div className="text-[10px] text-slate-400">{item.role} • {item.location}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
