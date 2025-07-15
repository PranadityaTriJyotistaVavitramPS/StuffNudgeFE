import React, { useState, useEffect } from 'react';

export default function AddActivityForm({ onSave, initialData }) {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [items, setItems] = useState('');

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date);
      setName(initialData.name);
      setItems(initialData.items.join(', '));
    } else {
      setDate(''); setName(''); setItems('');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!date || !name) return;
    const payload = {
      id: initialData?.id || Date.now(),
      date,
      name,
      items: items.split(',').map(s => s.trim()),
    };
    onSave(payload);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>
        {initialData ? 'Edit Aktivitas' : 'Tambah Aktivitas Baru'}
      </h3>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nama Aktivitas"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Barang dibawa (pisahkan dengan koma)"
        value={items}
        onChange={e => setItems(e.target.value)}
      />
      <button type="submit">
        {initialData ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
}
