import React from 'react';
import { format } from 'date-fns';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function ActivityDetail({ activity, onEdit, onDelete }) {
  if (!activity) return null;

  return (
    <div className="detail-panel-content">
      <div className="detail-header">
        <h2>{activity.name}</h2>
        <div className="detail-actions">
          <button onClick={() => onEdit(activity)}>
            <FiEdit />
          </button>
          <button onClick={() => onDelete(activity.id)}>
            <FiTrash2 />
          </button>
        </div>
      </div>

      <p><strong>Tanggal Aktivitas:</strong> {activity.date}</p>
      <p><strong>Barang Bawaan:</strong></p>
      <ul>
        {activity.items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>

      <hr />

      <p className="created-at">
        Dibuat pada: {format(new Date(activity.createdAt), 'dd MMMM yyyy HH:mm')}
      </p>
    </div>
  );
}
