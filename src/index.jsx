import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/variables.css';
import './styles/Dashboard.css';
import './styles/LandingPage.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
