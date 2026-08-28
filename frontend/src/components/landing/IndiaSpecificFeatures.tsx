'use client';

import React from 'react';
import { 
  Languages, 
  ShoppingBag, 
  CheckCircle2, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const IndiaSpecificFeatures: React.FC = () => {
  const languages = ['Hindi', 'Hinglish', 'Tamil', 'Telugu', 'Kannada', 'Marathi', 'Bengali', 'Gujarati', 'Malayalam', 'Punjabi', 'Odia', 'English'];

  return (
    <section id="india-engine" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold px-3 py-1 mb-4">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            Built Specifically For The Indian Market
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Western Tools Fail In India. Cowork AI Was Born Here.
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            From Tier 2/3 dialect nuances to WhatsApp UPI checkouts and festive sales spikes — we solve India&apos;s hardest marketing challenges out-of-the-box.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Regional Langs */}
          <Card className="bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4">
                <Languages className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">12 Indian Languages & Hinglish</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Generate high-converting ad copies that sound like real people from Lucknow, Hyderabad, Surat, or Coimbatore — not robotic translations.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
              <span className="text-orange-400 font-semibold">Live Example:</span> &quot;Ab skin problems ko bolo bye! 100% Ayurvedic results in 7 days. Cash on Delivery available!&quot;
            </div>
          </Card>

          {/* Card 2: WhatsApp Commerce */}
          <Card className="bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp & UPI Funnel Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Turn click-to-WhatsApp ads into automatic checkouts. Recovers dropped UPI transactions with personalized WhatsApp nudges within 15 minutes.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>One-click UPI payment links generated on WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>68% drop-off cart recovery rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Interactive product catalogs with automated inventory sync</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 flex justify-between items-center">
              <span>Avg. Conversion Rate:</span>
              <span className="font-bold text-emerald-400 text-xs">8.4% (vs 1.8% Web)</span>
            </div>
          </Card>

          {/* Card 3: Festive Surge Predictor */}
          <Card className="bg-slate-900/70 border-slate-800 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Festive & Cricket Surge AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Automated budget ramps and creative rotations for Diwali, IPL matchdays, Eid, Rakhi, and Great Indian Festival sales without sleep deprivation.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  <span>Dynamic IPL match situational ad triggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  <span>Diwali gifting cohort segmentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  <span>Quick Commerce (Zepto/Blinkit) ad synchronization</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 flex justify-between items-center">
              <span>Peak Day ROAS Scaled:</span>
              <span className="font-bold text-purple-400 text-xs">6.8x On High Demand Days</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
