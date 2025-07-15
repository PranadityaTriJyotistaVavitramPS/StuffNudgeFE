import React from 'react';

export default function ActivityItem({ activity, onSelect }) {
  return (
    <div
      className="activity-item"
      onClick={() => onSelect(activity)}
    >
      <div className="item-header">
        <strong className="item-name">{activity.name}</strong>
      </div>
      <div className="item-date">{activity.date}</div>
    </div>
  );
}
