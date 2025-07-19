import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
} from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function CalendarView({ activities, onDateClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });
  const blanks = Array(getDay(start)).fill(null);
  const cells = [...blanks, ...days];

  const prevMonth = () => setCurrentMonth(m => addMonths(m, -1));
  const nextMonth = () => setCurrentMonth(m => addMonths(m, 1));

  const handleClickDate = dateStr => {
    setSelectedDate(dateStr);
    onDateClick(dateStr);
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={prevMonth}>
          <FiChevronLeft />
        </button>
        <h3>{format(currentMonth, 'MMMM yyyy', { locale: localeID })}</h3>
        <button onClick={nextMonth}>
          <FiChevronRight />
        </button>
      </div>

      <table className="calendar">
        <thead>
          <tr>
            {daysOfWeek.map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(cells.length / 7) }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {cells.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, idx) => {
                if (!day) return <td key={idx} />;

                const dateStr = format(day, 'yyyy-MM-dd');
                const isTodayCell = dateStr === format(today, 'yyyy-MM-dd');
                const hasActivity = activities.some(a => a.date === dateStr);
                const isSelected = dateStr === selectedDate;

                const classNames = [
                  hasActivity && 'has-activity',
                  isTodayCell && 'today',
                  isSelected && 'selected'
                ].filter(Boolean).join(' ');

                return (
                  <td
                    key={idx}
                    className={classNames}
                    onClick={() => handleClickDate(dateStr)}
                  >
                    {format(day, 'd')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
