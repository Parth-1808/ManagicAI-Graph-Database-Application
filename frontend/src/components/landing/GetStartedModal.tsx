'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { LoadingThreeDotsJumping } from '@/components/ui/LoadingThreeDotsJumping';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [userRole, setUserRole] = useState<'manager' | 'agency'>('manager');
  const [email, setEmail] = useState('');
  const [modalState, setModalState] = useState<'form' | 'loading' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Trigger the jumping three dots loading animation
    setModalState('loading');

    setTimeout(() => {
      setModalState('success');
    }, 1800);
  };

  const handleClose = () => {
    setModalState('form');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-none bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 border border-purple-200 p-6 sm:p-8 shadow-2xl z-10 space-y-6 min-h-[380px] flex flex-col justify-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer border border-slate-200"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {modalState === 'form' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {/* Modal Header */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold font-mono uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                    <span>Priority Access • Talent Command Hub</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Get Started with Managic
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Join leading talent managers running actor schedules, brand deals, and VIP galas on autopilot.
                  </p>
                </div>

                {/* Role Selector Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-purple-100/60 rounded-none border border-purple-200">
                  <button
                    type="button"
                    onClick={() => setUserRole('manager')}
                    className={`py-2.5 px-3 rounded-none text-xs font-bold transition-all cursor-pointer ${
                      userRole === 'manager'
                        ? 'bg-white text-slate-900 shadow-xs border border-purple-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ⭐ Solo Talent Manager
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('agency')}
                    className={`py-2.5 px-3 rounded-none text-xs font-bold transition-all cursor-pointer ${
                      userRole === 'agency'
                        ? 'bg-white text-slate-900 shadow-xs border border-purple-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏢 Talent Agency / Roster
                  </button>
                </div>

                {/* Role Benefit Bullet */}
                <div className="p-3 bg-white/90 rounded-none border border-purple-200 text-xs text-slate-700 space-y-1 font-medium shadow-2xs">
                  {userRole === 'manager' ? (
                    <div className="flex items-center gap-2 text-purple-800">
                      <Zap className="h-3.5 w-3.5 shrink-0 text-purple-600" />
                      <span>Instant calendar sync, 0 double-bookings, &amp; automatic exclusivity checks.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-indigo-800">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
                      <span>Manage multi-actor rosters, team permissions, and unified brand deal pipelines.</span>
                    </div>
                  )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {userRole === 'manager' ? 'Work Email' : 'Agency Official Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={userRole === 'manager' ? 'manager@talent.com' : 'contact@agency.com'}
                      className="w-full px-4 py-3 rounded-none bg-white border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-none bg-slate-900 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Continue to Talent Workspace</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* Loading State with LoadingThreeDotsJumping */}
            {modalState === 'loading' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 space-y-6 flex flex-col items-center justify-center"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-purple-600 uppercase tracking-widest">
                    INITIALIZING MANAGIC
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Connecting Talent Knowledge Graph...
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Setting up automated shoot calendars, brand deal pipeline, and conflict engine.
                  </p>
                </div>

                {/* The Jumping Three Dots Loading Animation */}
                <LoadingThreeDotsJumping />

                <div className="text-[11px] font-mono text-slate-400">
                  Please hold on a moment...
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {modalState === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 space-y-4"
              >
                <div className="h-14 w-14 rounded-none bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs border border-emerald-300">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-black text-slate-900">You&apos;re On the Priority Access List!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  We have secured your access for <strong className="text-slate-900">{email}</strong>. Our team will onboard your actor management workspace shortly.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 rounded-none bg-slate-900 text-white text-xs font-bold hover:bg-purple-700 transition-colors cursor-pointer shadow-md"
                >
                  Done
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
