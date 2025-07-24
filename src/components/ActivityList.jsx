import React from 'react';
import {
  format,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import ActivityItem from './ActivityItem';

export default function ActivityList({ activities, onSelect }) {
  if (!activities.length) {
    return <p className="no-activity">Belum ada aktivitas.</p>;
  }

  const groups = activities.reduce((acc, act) => {
    const d = parseISO(act.date);
    let label;
    if (isToday(d)) label = 'Hari Ini';
    else if (isTomorrow(d)) label = 'Besok';
    else if (isYesterday(d)) label = 'Kemarin';
    else label = format(d, 'dd MMMM yyyy', { locale: localeID });
    acc[label] = acc[label] || [];
    acc[label].push(act);
    return acc;
  }, {});

  Object.keys(groups).forEach(label => {
    groups[label].sort((a, b) =>
      parseISO(a.date) - parseISO(b.date)
    );
  });

  const order = ['Hari Ini', 'Besok', 'Kemarin'];
  const other = Object.keys(groups)
    .filter(l => !order.includes(l))
    
    .sort((a, b) => {
      const dateA = parseISO(groups[a][0].date);
      const dateB = parseISO(groups[b][0].date);
      return dateA - dateB;
    });

  const labels = [
    ...order.filter(l => groups[l]),
    ...other
  ];

  return (
    <>
      {labels.map(label => (
        <div key={label} className="activity-group">
          <h3 className="group-title">{label}</h3>
          <div className="activity-list">
            {groups[label].map(act => (
              <ActivityItem
                key={act.id}
                activity={act}
                onSelect={() => onSelect(act)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
