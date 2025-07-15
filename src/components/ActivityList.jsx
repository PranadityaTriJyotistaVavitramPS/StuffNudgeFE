import React from 'react';
import ActivityItem from './ActivityItem';

export default function ActivityList({ activities, onSelect }) {
  if (activities.length === 0) {
    return <p className="no-activity">Belum ada aktivitas.</p>;
  }
  return (
    <div className="activity-list">
      {activities.map(act => (
        <ActivityItem
          key={act.id}
          activity={act}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
