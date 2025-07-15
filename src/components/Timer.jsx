import React, { useState, useRef, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const hrs  = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const handleStartPause = () => setRunning(r => !r);
  const handleReset      = () => { setRunning(false); setSeconds(0); };

  return (
    <div className="timer-component">
      <div className="timer-blocks">
        <div className="timer-block">
          <div className="time">{hrs}</div>
          <div className="label">Hours</div>
        </div>
        <div className="timer-block">
          <div className="time">{mins}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="timer-block">
          <div className="time">{secs}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
      <div className="timer-controls">
        <button className="timer-button" onClick={handleStartPause}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="timer-button reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
