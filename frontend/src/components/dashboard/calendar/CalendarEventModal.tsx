'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CalendarEvent, CalendarEventCategory } from '@/types';

export interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CalendarEvent) => void;
  selectedDay: number;
  month: number;
  year: number;
  monthName: string;
}

export const CalendarEventModal: React.FC<CalendarEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedDay,
  month,
  year,
  monthName,
}) => {
  const [title, setTitle] = useState('');
  const [brandOrClient, setBrandOrClient] = useState('');
  const [category, setCategory] = useState<CalendarEventCategory>('Shoot');
  const [time, setTime] = useState('10:00 AM');
  const [amount, setAmount] = useState('₹25,00,000');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      dateKey: selectedDay,
      month,
      year,
      title: title.trim(),
      brandOrClient: brandOrClient.trim() || undefined,
      time,
      category,
      amount: amount.trim() || undefined,
      status: 'pending',
    };

    onAddEvent(newEvent);
    setTitle('');
    setBrandOrClient('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-0">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-purple-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-50 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Schedule Itinerary Item
            </h3>
            <p className="text-xs text-slate-500">
              For {selectedDay} {monthName} {year}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Event / Call-Sheet Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. War 2 London Shoot Climax"
              className="w-full px-3.5 py-2 bg-slate-50 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CalendarEventCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-purple-100 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              >
                <option value="Shoot">Shoot / Production</option>
                <option value="Brand Collab">Brand Collab</option>
                <option value="VIP Gala">VIP Gala / Red Carpet</option>
                <option value="Meeting">Meeting / Reading</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Time Window
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 06:00 AM - 02:00 PM"
                className="w-full px-3.5 py-2 bg-slate-50 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Client / Studio / Brand
            </label>
            <input
              type="text"
              value={brandOrClient}
              onChange={(e) => setBrandOrClient(e.target.value)}
              placeholder="e.g. Yash Raj Films / Rolex"
              className="w-full px-3.5 py-2 bg-slate-50 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Escrow Value / Fee (Optional)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. ₹45,00,000"
              className="w-full px-3.5 py-2 bg-slate-50 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
