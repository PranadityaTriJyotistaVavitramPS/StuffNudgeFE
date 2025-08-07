import React, { useState, useEffect } from 'react';

export default function AddActivityForm({ onSave, onCancel, initialData }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [itemsInput, setItemsInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDate(initialData.date);
      setDescription(initialData.description || '');
      setItemsInput((initialData.items || []).join(', '));
    } else {
      setName('');
      setDate('');
      setDescription('');
      setItemsInput('');
    }
  }, [initialData]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim() || !date) return;

    const items = itemsInput?.split(',')
      .map(s => s.trim())
      .filter(s => s);

    setSaving(true);
    try {
      await onSave({
        id: initialData?.id || Date.now(),
        name: name.trim(),
        date,
        description: description.trim(),
        items,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="add-form modal-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Ubah Aktivitas' : 'Tambah Aktivitas'}</h3>

      <label>Nama Aktivitas</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        disabled={saving}
      />

      <label>Tanggal</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
        disabled={saving}
      />

      <label>Deskripsi</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi singkat..."
        rows={3}
        style={{ resize: 'vertical', maxHeight: '150px' }}
        disabled={saving}
      />

      <label>Barang Bawaan (pisahkan dengan koma)</label>
      <input
        type="text"
        value={itemsInput}
        onChange={e => setItemsInput(e.target.value)}
        placeholder="Contoh: Dompet, earphone, tumbler..."
        disabled={saving}
      />

      <div className="modal-form-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={onCancel}
          disabled={saving}
        >
          Batal
        </button>
        <button
          type="submit"
          className="btn-save"
          disabled={saving}
        >
          {saving
            ? initialData
              ? 'Menyimpan...'
              : 'Menambahkan...'
            : initialData
            ? 'Update'
            : 'Tambah'}
        </button>
      </div>
    </form>
  );
}
