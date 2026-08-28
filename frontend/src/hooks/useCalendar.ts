'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { CalendarEvent, DayCellData } from '@/types';
import { useWorkStore } from '@/store/useWorkStore';

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function useCalendar() {
  const {
    calendarEventsList,
    calendarEvents,
    fetchCalendarEvents,
    addCalendarEvent,
    deleteCalendarEvent,
  } = useWorkStore();

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1)); // August 2026
  const [selectedDay, setSelectedDay] = useState<number>(28); // Aug 28 (Today)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  useEffect(() => {
    fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date(2026, 7, 1));
    setSelectedDay(28);
  }, []);

  // Calculate calendar grid metrics
  const daysInMonth = useMemo(
    () => new Date(currentYear, currentMonth + 1, 0).getDate(),
    [currentYear, currentMonth]
  );

  const daysInPrevMonth = useMemo(
    () => new Date(currentYear, currentMonth, 0).getDate(),
    [currentYear, currentMonth]
  );

  const firstDaySundayBased = useMemo(
    () => new Date(currentYear, currentMonth, 1).getDay(),
    [currentYear, currentMonth]
  );

  const firstDayMondayBased = (firstDaySundayBased + 6) % 7;

  // Selected day's events from store
  const selectedDayEvents = useMemo(
    () =>
      calendarEventsList.filter(
        (e) =>
          Number(e.dateKey) === selectedDay &&
          (e.month ?? 7) === currentMonth &&
          (e.year ?? 2026) === currentYear
      ),
    [calendarEventsList, selectedDay, currentMonth, currentYear]
  );

  // Month grid days calculation
  const calendarCells = useMemo<DayCellData[]>(() => {
    const cells: DayCellData[] = [];

    // Previous month filler days
    for (let i = firstDayMondayBased - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      cells.push({
        dayNumber: dayNum,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, dayNum),
        isToday: false,
        isSelected: false,
        events: [],
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = calendarEventsList.filter(
        (e) =>
          Number(e.dateKey) === day &&
          (e.month ?? 7) === currentMonth &&
          (e.year ?? 2026) === currentYear
      );

      cells.push({
        dayNumber: day,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, day),
        isToday: day === 28 && currentMonth === 7 && currentYear === 2026,
        isSelected: day === selectedDay,
        events: dayEvents,
      });
    }

    // Next month filler days to complete rows
    const totalCells = cells.length <= 35 ? 35 : 42;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      cells.push({
        dayNumber: day,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, day),
        isToday: false,
        isSelected: false,
        events: [],
      });
    }

    return cells;
  }, [
    firstDayMondayBased,
    daysInPrevMonth,
    daysInMonth,
    calendarEventsList,
    currentMonth,
    currentYear,
    selectedDay,
  ]);

  const addEvent = useCallback(
    async (newEvent: CalendarEvent) => {
      await addCalendarEvent(newEvent);
    },
    [addCalendarEvent]
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      await deleteCalendarEvent(id);
    },
    [deleteCalendarEvent]
  );

  return {
    currentDate,
    currentYear,
    currentMonth,
    monthName: MONTH_NAMES[currentMonth],
    selectedDay,
    setSelectedDay,
    events: calendarEventsList,
    selectedDayEvents,
    calendarCells,
    weekdays: WEEKDAYS,
    isTaskFormOpen,
    setIsTaskFormOpen,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
    addEvent,
    deleteEvent,
  };
}
