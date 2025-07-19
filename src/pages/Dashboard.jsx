import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { FiPlus } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import AddActivityForm from '../components/AddActivityForm';
import ActivityList from '../components/ActivityList';
import ActivityDetail from '../components/ActivityDetail';
import Timer from '../components/Timer';
import CalendarView from '../components/CalendarView';
import Profile from '../components/Profile';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editAct, setEditAct] = useState(null);
  const [filterDate, setFilter] = useState(null);
  const [showModal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [user, setUser] = useState({
    username: 'User123',
    email: 'user@example.com',
  });

  const handleNav = useCallback(v => {
    const todayKey = format(new Date(), 'yyyy-MM-dd');
    setView(v);
    setSelected(null);
    setEditAct(null);
    setFilter(v === 'history' ? todayKey : null);
    setSearchQuery('');
  }, []);

  const handleSearch = q => {
    setSearchQuery(q.toLowerCase().trim());
  };

  const handleSave = act => {
    if (editAct) {
      const updated = { ...act, createdAt: editAct.createdAt, completed: editAct.completed };
      setActivities(a => a.map(x => x.id === updated.id ? updated : x));
      setSelected(updated);
    } else {
      const now = new Date().toISOString();
      const newAct = { ...act, createdAt: now, completed: false };
      setActivities(a => [newAct, ...a]);
      setSelected(newAct);
    }
    setEditAct(null);
    setModal(false);
  };

  const handleDelete = id => {
 
    setActivities(a => a.filter(x => x.id !== id));
    setSelected(null);
    setEditAct(null);
  };

  const handleEdit = act => {
    setEditAct(act);
    setModal(true);
  };

  const handleComplete = id => {
   
    setActivities(a => a.map(x => x.id === id ? { ...x, completed: true } : x));
    setSelected(null);
  };

  const handleDateClick = date => {
    setFilter(date);
    setView('history');
    setSearchQuery('');
  };

  const handleProfileSave = ({ username, email }) => {
    setUser(u => ({ ...u, username, email }));
    alert('Profil berhasil disimpan.');
  };

  
  const filterByQuery = list =>
    list.filter(a => a.name.toLowerCase().includes(searchQuery));


  const activeActs = activities.filter(a => !a.completed);
  const visibleMainActs = searchQuery
    ? filterByQuery(activeActs)
    : activeActs;

  
  const rawShown = activities.filter(a => a.date === filterDate);
  const shownActs = rawShown;
  const calendarResults = searchQuery
    ? filterByQuery(activities)  
    : shownActs;               

  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const rawToday = activities.filter(a => a.date === todayKey && !a.completed);
  const todayActs = searchQuery
    ? filterByQuery(rawToday)
    : rawToday;

  return (
    <div className={`dashboard-container${selected ? ' with-detail' : ''}`}>
      <Navbar onSelect={handleNav} currentView={view} onSearch={handleSearch} />

      <main className="main">
        {view === 'main' && (
          <>
            <header><h1 className="section-title">Aktivitasmu</h1></header>
            {visibleMainActs.length > 0 ? (
              <>
                <ActivityList activities={visibleMainActs} onSelect={act => setSelected(act)} />
                <button className="btn-add-floating" onClick={() => { setModal(true); setEditAct(null); }}>
                  <FiPlus size={24} />
                </button>
              </>
            ) : searchQuery ? (
              <p className="no-activity">Aktivitas tidak ditemukan.</p>
            ) : (
              <div className="empty-state">
                <div className="empty-cta-card">
                  <h2>Halo, {user.username}</h2>
                  <p>Rencakan aktivitasmu sekarang dengan mudah!</p>
                  <button
                    className="btn-add-main"
                    onClick={() => { setModal(true); setEditAct(null); }}
                  >
                    Mulai Aktivitas Baru
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {view === 'history' && (
          <>
            <h2 className="section-title">Riwayat Aktivitas</h2>
            <CalendarView
              activities={activities}
              selectedDate={filterDate}
              onDateClick={handleDateClick}
            />

            {calendarResults.length > 0 ? (
              <ActivityList activities={calendarResults} onSelect={act => setSelected(act)} />
            ) : (
              <p className="no-activity">
                {searchQuery
                  ? 'Aktivitas tidak ditemukan.'
                  : 'Tidak ada aktivitas pada tanggal ini.'}
              </p>
            )}
          </>
        )}

        {view === 'timer' && (
          <>
            <h2 className="section-title">Timer</h2>
            <Timer />
            {todayActs.length > 0 ? (
              <ActivityList activities={todayActs} onSelect={act => setSelected(act)} />
            ) : (
              <p className="no-activity">
                {searchQuery
                  ? 'Aktivitas tidak ditemukan.'
                  : 'Belum ada aktivitas untuk hari ini.'}
              </p>
            )}
          </>
        )}

        {view === 'profile' && (
          <Profile user={user} onSaveProfile={handleProfileSave} />
        )}
      </main>

      {selected && (
        <aside key={selected.id} className="detail-panel">
          <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
          <ActivityDetail
            activity={selected}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </aside>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddActivityForm onSave={handleSave} onCancel={() => setModal(false)} initialData={editAct} />
          </div>
        </div>
      )}
    </div>
  );
}
