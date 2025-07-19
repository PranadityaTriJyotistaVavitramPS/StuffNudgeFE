import React from 'react';

export default function Timer({
  inputHours,
  inputMinutes,
  secondsLeft,
  running,
  onChangeHours,
  onChangeMinutes,
  onStart,
  onToggle,
  onReset
}) {
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
            onChange={e => onChangeHours(Math.max(0, parseInt(e.target.value) || 0))}
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
              onChangeMinutes(Math.max(0, v));
            }}
            disabled={running || secondsLeft > 0}
          />
        </label>
        <button onClick={onStart} disabled={running || (inputHours === 0 && inputMinutes === 0)}>
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
        <button className="timer-button" onClick={onToggle} disabled={secondsLeft === 0}>
          {running ? 'Jeda' : 'Lanjut'}
        </button>
        <button className="timer-button reset" onClick={onReset}>
          Atur Ulang
        </button>
      </div>
    </div>
  );
}
