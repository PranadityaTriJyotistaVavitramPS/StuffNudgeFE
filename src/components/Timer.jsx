import React, { useState, useRef, useEffect } from 'react';

export default function Timer() {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStart = () => {
    const total = inputHours * 3600 + inputMinutes * 60;
    if (total > 0) {
      setSecondsLeft(total);
      setRunning(true);
    }
  };

  const toggleRunning = () => {
    if (secondsLeft > 0) {
      setRunning(r => !r);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSecondsLeft(0);
    setInputHours(0);
    setInputMinutes(0);
  };

  const hrs  = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="timer-component">
      <div className="timer-setup">
        <label>
          Jam:
          <input
            type="number"
            min="0"
            value={inputHours}
            onChange={e => setInputHours(Math.max(0, parseInt(e.target.value) || 0))}
            disabled={running || secondsLeft > 0}
          />
        </label>
        <label>
          Menit:
          <input
            type="number"
            min="0"
            max="59"
            value={inputMinutes}
            onChange={e => {
              let v = parseInt(e.target.value) || 0;
              if (v > 59) v = 59;
              setInputMinutes(Math.max(0, v));
            }}
            disabled={running || secondsLeft > 0}
          />
        </label>
        <button onClick={handleStart} disabled={running || (inputHours === 0 && inputMinutes === 0)}>
          Mulai
        </button>
      </div>

      <div className="timer-blocks">
        <div className="timer-block">
          <div className="time">{hrs}</div>
          <div className="label">Jam</div>
        </div>
        <div className="timer-block">
          <div className="time">{mins}</div>
          <div className="label">Menit</div>
        </div>
        <div className="timer-block">
          <div className="time">{secs}</div>
          <div className="label">Detik</div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="timer-button" onClick={toggleRunning} disabled={secondsLeft === 0}>
          {running ? 'Jeda' : 'Lanjut'}
        </button>
        <button className="timer-button reset" onClick={handleReset}>
          Atur Ulang
        </button>
      </div>
    </div>
);
}
