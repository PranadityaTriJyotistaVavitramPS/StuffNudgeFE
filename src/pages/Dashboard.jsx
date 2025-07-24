import React, { useState, useCallback, useEffect } from 'react';
import { getAccessToken, getUserLogged,updateUser,addActivity,getAllActivity,deleteActivity,updateActivity } from '../utils/network-data';
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
  console.log(user)

  const whoIsLogged = async () => {
    const token = getAccessToken();
    if (token) {
      const userData = await getUserLogged();
      if (userData.error) {
        console.error("Failed to fetch user data:", userData.message);
      } else {
        setUser(userData.data);
      }
    }
  }

  const getActivities = async () => {
    const result = await getAllActivity();
    if (!result.error) {
      const formatted = result.data.map(item => ({
        ...item,
        id: item.id_activity,
        name: item.activity_name,
        date: item.activity_date,
        item: item.items,
        completed: false 
      }));
      
      console.log("Ini hasilnya",result.data[0])
      setActivities(formatted);
    } else {
      alert("Gagal memuat aktivitas dari server.");
    }
  };

  useEffect(() => {
    whoIsLogged();
    getActivities()
  }, []);

  const [timerInputHours, setTimerInputHours] = useState(0);
  const [timerInputMinutes, setTimerInputMinutes] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

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

  const handleSearch = q => {
    setSearchQuery(q.toLowerCase().trim());
  };

  const handleSave = async (act) => {
    if (editAct) {
      const result = await updateActivity({
        id_activity:editAct.id,
        createdAt: editAct.createdAt,
        completed: editAct.completed,
        description: act.description,
        items: act.items,
        activity_date: act.date,
        activity_name: act.name
      });
      console.log("ini resultnya pas ngupdate", result);

      if( result.error ){
        alert('gagal lagi gagal lagi, capek bang udah rill');
        return;
      }

      await getActivities();
      setSelected(null); 
    } else {
      const result = await addActivity({
        activity_name: act.name,
        activity_date: act.date,
        description:act.description,
        items: act.items,
      });

      if (result.error) {
        alert('Gagal menyimpan aktivitas ke server.');
        return;
      }
      await getActivities()
    }

    setEditAct(null);
    setModal(false);
  };


  const handleDelete = async(id) => {
    await deleteActivity(id)
    await getActivities()
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
    if (selected) {
      const actsOnDate = activities.filter(a => a.date === date);
      setSelected(actsOnDate[0] || null);
    }
  };

  const handleProfileSave = async ({ username, email }) => {
    const result = await updateUser({ username, email });

    if (result.error) {
      alert('Gagal mengupdate profil.');
    } else {
      await whoIsLogged();
      alert('Profil berhasil disimpan.');
    }
  };


  const filterByQuery = list =>
    list.filter(a => a.name.toLowerCase().includes(searchQuery));

  const activeActs = activities.filter(a => !a.completed);
    
  const visibleMainActs = searchQuery
    ? filterByQuery(activeActs)
    : activeActs;

  const shownActs = activities.filter(a => a.date === filterDate);
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
