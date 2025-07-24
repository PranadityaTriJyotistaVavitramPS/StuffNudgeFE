import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import {  BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}
