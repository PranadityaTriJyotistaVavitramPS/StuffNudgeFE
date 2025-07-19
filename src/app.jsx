import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  return showLanding ? (
    <LandingPage onEnter={() => setShowLanding(false)} />
  ) : (
    <Dashboard />
  );
}
