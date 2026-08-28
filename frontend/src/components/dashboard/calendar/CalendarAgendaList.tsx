import React from 'react';
import { Clock, Film, Briefcase, Sparkles, Trash2 } from 'lucide-react';
import { CalendarEvent } from '@/types';

export interface CalendarAgendaListProps {
  events: CalendarEvent[];
  selectedDay: number;
  monthName: string;
  onDeleteEvent?: (id: string) => void;
}

export const CalendarAgendaList: React.FC<CalendarAgendaListProps> = ({
  events,
  selectedDay,
  monthName,
  onDeleteEvent,
}) => {
  const getCategoryBadge = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'Shoot':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Brand Collab':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'VIP Gala':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Meeting':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCategoryIcon = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'Shoot':
        return <Film className="h-3.5 w-3.5 text-blue-600" />;
      case 'Brand Collab':
        return <Briefcase className="h-3.5 w-3.5 text-emerald-600" />;
      case 'VIP Gala':
        return <Sparkles className="h-3.5 w-3.5 text-purple-600" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-3 pt-3 border-t border-purple-100">
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
        <span>
          Agenda for {selectedDay} {monthName}
        </span>
        <span className="text-purple-700 font-extrabold">
          {events.length} {events.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-dashed border-purple-100 text-center text-xs text-slate-400">
          No scheduled shoots or meetings for this day. Click &quot;Add Event&quot; to plan one.
        </div>
      ) : (
        <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-3 rounded-2xl bg-white border border-purple-100/90 shadow-2xs hover:border-purple-300 transition-all flex flex-col space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="p-1 rounded-lg bg-slate-50 border border-slate-100 shrink-0">
                    {getCategoryIcon(evt.category)}
                  </div>
                  <span className="text-xs font-black text-slate-900 truncate">
                    {evt.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadge(
                      evt.category
                    )}`}
                  >
                    {evt.category}
                  </span>
                  {onDeleteEvent && (
                    <button
                      type="button"
                      onClick={() => onDeleteEvent(evt.id)}
                      className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{evt.brandOrClient || 'Private Production'}</span>
                {evt.time && (
                  <span className="font-semibold text-slate-700">{evt.time}</span>
                )}
              </div>

              {evt.amount && (
                <div className="text-[11px] font-extrabold text-purple-900 bg-purple-50/70 px-2 py-0.5 rounded-md self-start border border-purple-100">
                  {evt.amount}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
