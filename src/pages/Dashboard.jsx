import React, { useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import AddActivityForm from '../components/AddActivityForm';
import ActivityList from '../components/ActivityList';
import ActivityDetail from '../components/ActivityDetail';
import Timer from '../components/Timer';
import CalendarView from '../components/CalendarView';

export default function Dashboard() {
  const [view, setView] = useState('main'); 
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editActivity, setEditActivity] = useState(null);
  const [filteredDate, setFilteredDate] = useState(null);

  const handleNav = useCallback((newView) => {
    setView(newView);
    if (newView === 'main') {
      setFilteredDate(null);
      setSelected(null);
      setEditActivity(null);
    }
    if (newView !== 'history') {
      setFilteredDate(null);
    }
  }, []);

  const handleSave = (act) => {
    if (editActivity) {
      const updated = { ...act, createdAt: editActivity.createdAt };
      setActivities((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      setSelected(updated);
    } else {
      const newAct = { ...act, createdAt: new Date().toISOString() };
      setActivities((prev) => [newAct, ...prev]);
      setSelected(newAct);
    }
    setEditActivity(null);
  };

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
    if (editActivity?.id === id) setEditActivity(null);
  };

  const handleEdit = (act) => {
    setEditActivity(act);
    setSelected(null);
    setView('main');
  };

  const handleDateClick = (date) => {
    setFilteredDate(date);
    setView('history');
    setSelected(null);
  };

  const toShow = filteredDate
    ? activities.filter((a) => a.date === filteredDate)
    : activities;

  return (
    <div className="dashboard-container">
      <Navbar onSelect={handleNav} currentView={view} />
      <main className="main">
        {view === 'main' && (
          <>
            <header>
              <h1>Dashboard Aktivitas</h1>
            </header>
            <AddActivityForm onSave={handleSave} initialData={editActivity} />
            <ActivityList
              activities={activities}
              onSelect={(act) => {
                setSelected(act);
                setEditActivity(null);
              }}
            />
          </>
        )}

        {view === 'history' && (
          <>
            <CalendarView
              activities={activities}
              onDateClick={handleDateClick}
            />
            <ActivityList
              activities={toShow}
              onSelect={(act) => setSelected(act)}
            />
          </>
        )}

        {view === 'timer' && (
          <>
            <h2 className="timer-page-title">Timer</h2>
            <Timer />
            <div className="timer-activity-list">
              <h3>Tasks</h3>
              <ActivityList activities={activities} onSelect={() => {}} />
            </div>
          </>
        )}
      </main>

      {view === 'main' && selected && (
        <aside className="detail-panel">
          <button
            className="close-btn"
            onClick={() => setSelected(null)}
          >
            <FiX size={20} />
          </button>
          <ActivityDetail
            activity={selected}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </aside>
      )}
    </div>
  );
}
