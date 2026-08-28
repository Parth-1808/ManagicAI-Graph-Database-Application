import React from 'react';

export interface CalendarWeekHeaderProps {
  weekdays: string[];
}

export const CalendarWeekHeader: React.FC<CalendarWeekHeaderProps> = ({
  weekdays,
}) => {
  return (
    <div className="grid grid-cols-7 gap-1 text-center mb-1">
      {weekdays.map((day, idx) => (
        <div
          key={idx}
          className="text-[10px] sm:text-xs font-bold text-slate-400 py-1 uppercase"
        >
          {day}
        </div>
      ))}
    </div>
  );
};
