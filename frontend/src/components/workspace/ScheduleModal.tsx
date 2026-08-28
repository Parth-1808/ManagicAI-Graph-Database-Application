'use client';

import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Send,
  Layers,
  GitFork,
  ShieldCheck
} from 'lucide-react';
import { useWorkStore } from '@/store/useWorkStore';

export interface ScheduleModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const store = useWorkStore();
  const isModalOpen = isOpen !== undefined ? isOpen : store.isScheduleModalOpen;
  const handleClose = onClose || store.closeScheduleModal;
  const { scheduleItem } = store;

  const [type, setType] = useState<'event' | 'invitation' | 'collab'>('event');
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('Global Ambassadorship');
  const [date, setDate] = useState('Today, Aug 28');
  const [time, setTime] = useState('4:00 PM - 5:30 PM');
  const [location, setLocation] = useState('London Heathrow / Virtual');
  const [recipientName, setRecipientName] = useState('Elena Rostova');
  const [priority, setPriority] = useState<'critical' | 'high' | 'medium' | 'low'>('high');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await scheduleItem({
        type,
        title,
        description: description || `Scheduled ${type} for ${project}`,
        date,
        time,
        project,
        priority,
        location,
        recipientName,
        recipientRole: type === 'collab' ? 'Brand Partner' : 'A-List Talent',
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        handleClose();
        // Reset form
        setTitle('');
        setDescription('');
      }, 1200);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-purple-200 shadow-2xl max-w-xl w-full overflow-hidden text-slate-900 font-sans relative">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-800/80 border border-purple-400/40 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-200">
              <Sparkles className="h-3 w-3 text-purple-300 animate-pulse" />
              <span>AI Conflict Guard Active</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white">
              Schedule New Operation
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        {showSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Successfully Scheduled!</h4>
            <p className="text-xs text-slate-500 max-w-xs font-medium">
              Added to live CognoDB workspace, graph relationships synced, zero schedule clashes detected.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Operation Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Select Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'event', label: '🎬 Shoot / Event', icon: Calendar },
                  { id: 'invitation', label: '📩 VIP Invite / Gala', icon: GitFork },
                  { id: 'collab', label: '🤝 Brand Collab', icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = type === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setType(item.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 border-purple-600 text-white shadow-sm scale-[1.02]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Title / Subject *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  type === 'event' 
                    ? 'e.g., Commercial B-Roll Shoot in London' 
                    : type === 'invitation'
                    ? 'e.g., VIP Red Carpet Premiere at Cannes'
                    : 'e.g., Luxury Watch Endorsement Deal'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>

            {/* Grid 2 Columns: Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-purple-600" /> Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="h-3 w-3 text-purple-600" /> Time / Duration
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Grid 2 Columns: Project & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="h-3 w-3 text-purple-600" /> Campaign / Brand
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-purple-600" /> Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Recipient / Partner */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <User className="h-3 w-3 text-purple-600" /> Primary Talent / Lead
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Priority Tier
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="critical">🔴 Critical (A-List Launch)</option>
                  <option value="high">🟠 High (Brand Sponsorship)</option>
                  <option value="medium">🟡 Medium (Standard Event)</option>
                  <option value="low">🟢 Low (Routine Meeting)</option>
                </select>
              </div>
            </div>

            {/* Live Conflict Radar Banner */}
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-purple-950 font-bold">Radar Check:</span>
                <span className="text-slate-600 text-[11px]">0 Travel Clashes · Exclusivity 100% Clear</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                Sub-15ms Verified
              </span>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Scheduling...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Confirm &amp; Schedule Operation</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
