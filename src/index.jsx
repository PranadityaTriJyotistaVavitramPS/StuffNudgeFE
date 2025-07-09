import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/LandingPage.css';



const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);