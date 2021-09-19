import React, { useState } from 'react';
import './App.css';
import Pomodoro from './pomodoro/Pomodoro';

function App() {
  const initialState = {
    focusDuration: 25,
    breakDuration: 5,
  };

  const [activeSession, setActiveSession] = useState({ ...initialState });

  const decreaseFocusDuration = () => {
    if (activeSession.focusDuration === 5) return;
    setActiveSession({
      ...activeSession,
      focusDuration: activeSession.focusDuration - 1,
    });
  };

  const increaseFocusDuration = () => {
    if (activeSession.focusDuration === 60) return;
    setActiveSession({
      ...activeSession,
      focusDuration: activeSession.focusDuration + 1,
    });
  };

  const decreaseBreakDuration = () => {
    if (activeSession.breakDuration === 1) return;
    setActiveSession({
      ...activeSession,
      breakDuration: activeSession.breakDuration - 1,
    });
  };

  const increaseBreakDuration = () => {
    if (activeSession.breakDuration === 15) return;
    setActiveSession({
      ...activeSession,
      breakDuration: activeSession.breakDuration + 1,
    });
  };

  return (
    <div className='App'>
      <header className='App-header container'>
        <h1>Pomodoro Timer</h1>
      </header>
      <div className='container'>
        <Pomodoro
          initialState={initialState}
          activeSession={activeSession}
          decreaseFocusDuration={decreaseFocusDuration}
          increaseFocusDuration={increaseFocusDuration}
          decreaseBreakDuration={decreaseBreakDuration}
          increaseBreakDuration={increaseBreakDuration}
          setActiveSession={setActiveSession}
        />
      </div>
    </div>
  );
}

export default App;
