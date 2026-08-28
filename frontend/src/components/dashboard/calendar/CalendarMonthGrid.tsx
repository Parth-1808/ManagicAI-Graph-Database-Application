import React from 'react';
import { DayCellData } from '@/types';

export interface CalendarMonthGridProps {
  cells: DayCellData[];
  onSelectDay: (day: number) => void;
}

export const CalendarMonthGrid: React.FC<CalendarMonthGridProps> = ({
  cells,
  onSelectDay,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
      {cells.map((cell, idx) => {
        const hasEvents = cell.events && cell.events.length > 0;
        const isShoot = cell.events.some((e) => e.category === 'Shoot');
        const isBrand = cell.events.some((e) => e.category === 'Brand Collab');
        const isGala = cell.events.some((e) => e.category === 'VIP Gala');

        return (
          <button
            key={idx}
            type="button"
            disabled={!cell.isCurrentMonth}
            onClick={() => cell.isCurrentMonth && onSelectDay(cell.dayNumber)}
            className={`h-9 sm:h-10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex flex-col items-center justify-center relative transition-all ${
              !cell.isCurrentMonth
                ? 'text-slate-300 opacity-40 cursor-default'
                : cell.isSelected
                ? 'bg-purple-600 text-white shadow-md scale-105 z-10 font-black'
                : cell.isToday
                ? 'bg-purple-100/90 text-purple-950 border border-purple-300'
                : hasEvents
                ? 'bg-purple-50/70 text-slate-800 hover:bg-purple-100/80 font-extrabold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{cell.dayNumber}</span>

            {/* Event Dots */}
            {hasEvents && (
              <div className="flex items-center gap-0.5 mt-0.5">
                {isShoot && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cell.isSelected ? 'bg-white' : 'bg-blue-500'
                    }`}
                  />
                )}
                {isBrand && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cell.isSelected ? 'bg-white' : 'bg-emerald-500'
                    }`}
                  />
                )}
                {isGala && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cell.isSelected ? 'bg-white' : 'bg-purple-500'
                    }`}
                  />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
