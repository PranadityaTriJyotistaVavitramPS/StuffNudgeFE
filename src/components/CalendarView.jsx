import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

export default function CalendarView({ activities, onDateClick }) {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  // group by date
  const hasActivity = new Set(activities.map(a => a.date));

  // build calendar rows
  const blanks = Array(getDay(start)).fill(null);
  const cells = [...blanks, ...days];

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <div className="calendar">
      <h3>{format(today, 'MMMM yyyy')}</h3>
      <table>
        <thead>
          <tr>{['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                if (!day) return <td key={j} />;
                const dateStr = format(day, 'yyyy-MM-dd');
                return (
                  <td
                    key={j}
                    className={hasActivity.has(dateStr) ? 'has-activity' : ''}
                    onClick={() => onDateClick(dateStr)}
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
