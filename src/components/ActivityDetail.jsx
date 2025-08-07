import React from 'react';
import { format, parseISO } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import { FiEdit, FiTrash2, FiCheckCircle } from 'react-icons/fi';

export default function ActivityDetail({ activity, onEdit, onDelete, onComplete }) {
  if (!activity) return null;

  const { id, name, description, date, items, created_at, completed } = activity;

  console.log("Tanggal  yang diterima:", date);
  console.log("ini itemnya", items)
  return (
    <div className="detail-panel-content">
      <h2>{name}</h2>

      {description && (
        <p className="detail-desc">
          <strong>Deskripsi:</strong> {description}
        </p>
      )}

      <p className="detail-date">
        <strong>Tanggal Aktivitas:</strong>{' '}
        {format(parseISO(date), 'dd MMMM yyyy', { locale: localeID })}
      </p>

      <p className="detail-thing">
        <strong>Barang Bawaan:</strong>
      </p>
      <ul>
        {(Array.isArray(items) ? items : []).map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>

      <hr />
      
      <p className="created-at">
        Dibuat pada:{' '}
        {console.log("created_at", created_at)}
        {format(parseISO(created_at), 'dd MMMM yyyy HH:mm', { locale: localeID })}
      </p>

      {completed && (
        <p className="completed-notice">
          Aktivitas ini sudah kamu selesaikan.
        </p>
      )}

      <div className="detail-actions bottom">
        {!completed && (
          <button className="complete-btn" onClick={() => onComplete(id)}>
            <FiCheckCircle /> Selesai
          </button>
        )}

        {!completed && (
          <button className="edit-btn" onClick={() => onEdit(activity)}>
            <FiEdit /> Ubah
          </button>
        )}

        <button className="delete-btn" onClick={() => onDelete(id)}>
          <FiTrash2 /> Hapus
        </button>
      </div>
    </div>
  );
}
