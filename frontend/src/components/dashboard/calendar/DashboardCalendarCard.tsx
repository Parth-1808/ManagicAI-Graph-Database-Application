'use client';

import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus
} from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarWeekHeader } from './CalendarWeekHeader';
import { CalendarMonthGrid } from './CalendarMonthGrid';
import { CalendarAgendaList } from './CalendarAgendaList';
import { CalendarEventModal } from './CalendarEventModal';

export const DashboardCalendarCard: React.FC = () => {
  const {
    currentYear,
    currentMonth,
    monthName,
    selectedDay,
    setSelectedDay,
    selectedDayEvents,
    calendarCells,
    weekdays,
    isTaskFormOpen,
    setIsTaskFormOpen,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
    addEvent,
    deleteEvent,
  } = useCalendar();

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-5 sm:p-6 shadow-[0_12px_40px_rgba(168,85,247,0.06)] flex flex-col space-y-4">
      {/* Month & Year Navigation Header */}
      <div className="flex items-center justify-between border-b border-purple-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              {monthName} {currentYear}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Synchronized Shoot &amp; Event Radar
            </p>
          </div>
        </div>

        {/* Month Pagination & Quick Add */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goToToday}
            className="px-2.5 py-1 text-[11px] font-bold text-purple-700 hover:bg-purple-50 rounded-lg transition-colors mr-1"
          >
            Today
          </button>

          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-purple-100 hover:bg-purple-50 text-slate-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-purple-100 hover:bg-purple-50 text-slate-600 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsTaskFormOpen(true)}
            className="ml-1 p-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all"
            title="Add Event"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <CalendarWeekHeader weekdays={weekdays} />

      {/* Days Grid */}
      <CalendarMonthGrid
        cells={calendarCells}
        onSelectDay={setSelectedDay}
      />

      {/* Agenda for Selected Day */}
      <CalendarAgendaList
        events={selectedDayEvents}
        selectedDay={selectedDay}
        monthName={monthName}
        onDeleteEvent={deleteEvent}
      />

      {/* Add Event Dialog Modal */}
      <CalendarEventModal
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onAddEvent={addEvent}
        selectedDay={selectedDay}
        month={currentMonth}
        year={currentYear}
        monthName={monthName}
      />
    </div>
  );
};
