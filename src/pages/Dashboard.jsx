import React, { useState, useCallback, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  getAccessToken,
  getUserLogged,
  updateUser,
  addActivity,
  getAllActivity,
  deleteActivity,
  updateActivity
} from '../utils/network-data';
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
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [timerInputHours, setTimerInputHours] = useState(0);
  const [timerInputMinutes, setTimerInputMinutes] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const whoIsLogged = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;
    const userData = await getUserLogged();
    if (!userData.error) setUser(userData.data);
  }, []);

  const getActivities = useCallback(async () => {
    const result = await getAllActivity();
    if (!result.error) {
      const formatted = result.data.map(item => ({
        id: item.id_activity,
        name: item.activity_name,
        date: item.activity_date,
        description: item.description,
        items: item.items,
        created_at: item.created_at,
        completed: item.completed
      }));
      setActivities(formatted);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await whoIsLogged();
      await getActivities();
      setLoading(false);
    })();
  }, [whoIsLogged, getActivities]);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleTimerStart = () => {
    const total = timerInputHours * 3600 + timerInputMinutes * 60;
    if (total > 0) {
      setTimerSecondsLeft(total);
      setTimerRunning(true);
    }
  };
  const handleTimerToggle = () => {
    if (timerSecondsLeft > 0) setTimerRunning(r => !r);
  };
  const handleTimerReset = () => {
    setTimerRunning(false);
    setTimerSecondsLeft(0);
    setTimerInputHours(0);
    setTimerInputMinutes(0);
  };

  const handleNav = useCallback(v => {
    const todayKey = format(new Date(), 'yyyy-MM-dd');
    setView(v);
    setSelected(null);
    setEditAct(null);
    setFilter(v === 'history' ? todayKey : null);
    setSearchQuery('');
  }, []);
  const handleSearch = q => setSearchQuery(q.toLowerCase().trim());

  const handleSave = async act => {
    setLoading(true);
    if (editAct) {
      await updateActivity({
        id_activity: editAct.id,
        activity_name: act.name,
        activity_date: act.date,
        description: act.description,
        items: act.items
      });
      setSelected(null);
    } else {
      await addActivity({
        activity_name: act.name,
        activity_date: act.date,
        description: act.description,
        items: act.items
      });
    }
    await getActivities();
    setEditAct(null);
    setModal(false);
    setLoading(false);
  };

  const handleDelete = async id => {
    setLoading(true);
    await deleteActivity(id);
    await getActivities();
    setSelected(null);
    setLoading(false);
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
    if (selected) {
      const actsOnDate = activities.filter(a => a.date === date);
      setSelected(actsOnDate[0] || null);
    }
  };

  const handleProfileSave = async ({ username, email }) => {
    setLoading(true);
    await updateUser({ username, email });
    await whoIsLogged();
    setLoading(false);
    alert('Profil berhasil disimpan.');
  };

  const filterByQuery = list =>
    list.filter(a => a.name.toLowerCase().includes(searchQuery));

  const activeActs = activities.filter(a => !a.completed);
  const visibleMainActs = searchQuery ? filterByQuery(activeActs) : activeActs;
  const shownActs = activities.filter(a => a.date === filterDate);
  const calendarResults = searchQuery ? filterByQuery(activities) : shownActs;
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const rawToday = activities.filter(a => a.date === todayKey && !a.completed);
  const todayActs = searchQuery ? filterByQuery(rawToday) : rawToday;

  return (
    <div className={`dashboard-container${selected ? ' with-detail' : ''}`}>
      {loading && (
        <div className="spinner-overlay">
          <ClipLoader size={60} color="#578FCA" />
        </div>
      )}

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
                  <h2>Halo, {user?.username}</h2>
                  <p>Rencanakan aktivitasmu sekarang dengan mudah!</p>
                  <button className="btn-add-main" onClick={() => { setModal(true); setEditAct(null); }}>
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
                {searchQuery ? 'Aktivitas tidak ditemukan.' : 'Tidak ada aktivitas pada tanggal ini.'}
              </p>
            )}
          </>
        )}

        {view === 'timer' && (
          <>
            <h2 className="section-title">Timer</h2>
            <Timer
              inputHours={timerInputHours}
              inputMinutes={timerInputMinutes}
              secondsLeft={timerSecondsLeft}
              running={timerRunning}
              onChangeHours={setTimerInputHours}
              onChangeMinutes={setTimerInputMinutes}
              onStart={handleTimerStart}
              onToggle={handleTimerToggle}
              onReset={handleTimerReset}
            />
            {todayActs.length > 0 ? (
              <ActivityList activities={todayActs} onSelect={act => setSelected(act)} />
            ) : (
              <p className="no-activity">
                {searchQuery ? 'Aktivitas tidak ditemukan.' : 'Belum ada aktivitas untuk hari ini.'}
              </p>
            )}
          </>
        )}

        {view === 'profile' && (
          <Profile user={user} onSaveProfile={handleProfileSave} />
        )}
      </main>

      {selected && (
        <aside className="detail-panel">
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
