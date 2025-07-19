import React, { useState } from 'react';
import { FiHome, FiClock, FiUser } from 'react-icons/fi';
import { CgCalendarTwo } from 'react-icons/cg';
import logo from '../assets/logodash.svg';

export default function Navbar({ onSelect, currentView, onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const v = e.target.value;
    setQuery(v);
    if (onSearch) onSearch(v);
  };

  return (
    <nav className="sidebar">
      <div className="nav-top">
         <img src={logo} alt="Logo StuffNudge" className="logodash" />
        <div className="logo">StuffNudge</div>
        <div className="nav-search">
          <input
            type="search"
            placeholder="Cari aktivitasmu..."
            value={query}
            onChange={handleChange}
          />
        </div>

        <button
          className={currentView === 'main' ? 'active' : ''}
          onClick={() => onSelect('main')}
        >
          <FiHome /> Beranda
        </button>

        <button
          className={currentView === 'history' ? 'active' : ''}
          onClick={() => onSelect('history')}
        >
          <CgCalendarTwo /> Riwayat
        </button>

        <button
          className={currentView === 'timer' ? 'active' : ''}
          onClick={() => onSelect('timer')}
        >
          <FiClock /> Timer
        </button>
      </div>

      <div className="nav-bottom">
        <button
          className={currentView === 'profile' ? 'active' : ''}
          onClick={() => onSelect('profile')}
        >
          <FiUser /> Profil
        </button>
      </div>
    </nav>
  );
}
