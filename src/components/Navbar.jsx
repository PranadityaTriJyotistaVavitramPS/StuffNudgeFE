import React from 'react';
import { FiHome, FiClock, FiSettings } from 'react-icons/fi';
import { CgCalendarTwo } from 'react-icons/cg';

export default function Navbar({ onSelect, currentView }) {
  return (
    <nav className="sidebar">
      <div className="logo">StuffNudge</div>

      <button
        className={currentView === 'main' ? 'active' : ''}
        onClick={() => onSelect('main')}
      >
        <FiHome /> Dashboard
      </button>

      <button
        className={currentView === 'history' ? 'active' : ''}
        onClick={() => onSelect('history')}
      >
        <CgCalendarTwo /> History
      </button>

      <button
        className={currentView === 'timer' ? 'active' : ''}
        onClick={() => onSelect('timer')}
      >
        <FiClock /> Timer
      </button>

      <button
        className={currentView === 'settings' ? 'active' : ''}
        onClick={() => onSelect('settings')}
      >
        <FiSettings /> Settings
      </button>
    </nav>
  );
}
