import React, { useState, useEffect } from 'react';

export default function AddActivityForm({ onSave, onCancel, initialData }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [itemsInput, setItemsInput] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !date) return;
    const items = itemsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s);
    onSave({
      id: initialData?.id || Date.now(),
      name,
      date,
      description,
      items,
    });
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
      />

      <label>Tanggal</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <label>Deskripsi</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Deskripsi singkat..."
        rows={3}
        style={{ resize: 'vertical', maxHeight: '150px' }}
      />

      <label>Barang Bawaan (pisahkan dengan koma)</label>
      <input
        type="text"
        value={itemsInput}
        onChange={e => setItemsInput(e.target.value)}
        placeholder="Contoh: dompet, kunci, tumbler..."
      />

      <div className="modal-form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn-save">
          {initialData ? 'Update' : 'Tambah'}
        </button>
      </div>
    </form>
  );
}
