'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "How does Managic help manage an actor's brand collaborations and endorsements?",
    a: "Managic ingests inbound brand sponsorship pitches from email, agents, and DMs. It analyzes proposed deliverables (social posts, commercial shoots, event appearances), checks existing brand exclusivity lockouts, benchmarks market compensation rates, and generates professional deal summaries ready for 1-click negotiation or signoff.",
  },
  {
    q: "How does the conflict detection engine prevent double-booking between film shoots and events?",
    a: "Film shoots and call-sheets are constantly shifting. Managic connects your talent's film production schedule, commercial shoot dates, VIP red-carpet appearances, and flight itineraries into a live causal graph. If a director moves a night shoot that clashes with a brand gala or allows insufficient travel buffer (<24h), Managic alerts you instantly with recommended itinerary fixes.",
  },
  {
    q: "Can Managic handle VIP event invitations, gala RSVPs, and red-carpet logistics?",
    a: "Yes. Managic parses invitations for film festivals, fashion weeks, premieres, and charity galas. It manages RSVP deadlines, dress code specs, plus-one credentials, security protocols, and stylist coordination in one dedicated VIP tracker.",
  },
  {
    q: "How does email and inquiry triage work for high-volume inbound inboxes?",
    a: "Actor inboxes receive hundreds of mixed messages daily. Managic uses intelligent classification to separate high-priority director inquiries, brand partnership offers, and agent contracts from generic fan mail and PR spam, summarizing key action items directly on your manager dashboard.",
  },
  {
    q: "Can my actor/talent and their glam/security team have customized access?",
    a: "Yes. You can grant your actor view-only access to their daily itinerary and call-sheets on mobile, while giving stylists, glam, and security teams access strictly to wardrobe requirements and location coordinates without exposing sensitive commercial contract terms.",
  },
  {
    q: "How fast is onboarding for existing agency calendars and email accounts?",
    a: "Under 2 minutes. Connect your Google/Outlook calendar and inbox with 1-click OAuth. Managic immediately indexes upcoming shoot dates, contracts, and active brand conversations into your new talent graph.",
  },
];

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-[#faf7fd] via-white to-[#faf7fd] border-t border-purple-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-100/90 to-indigo-100/90 border border-purple-200 text-purple-900 text-xs font-bold font-mono uppercase mb-4">
            <HelpCircle className="h-3.5 w-3.5 mr-1 text-purple-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything Talent Managers Need to Know
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            Clear answers about managing actor schedules, brand collabs, VIP invitations, and inbox automation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="border border-purple-200/90 bg-gradient-to-br from-white/95 via-purple-50/40 to-indigo-50/50 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-purple-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-purple-100 mt-2">
                        <div className="pt-4">{faq.a}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
