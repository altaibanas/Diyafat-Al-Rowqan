import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Activate preloaded non-blocking Google Fonts stylesheet without inline HTML event handlers
const fontLink = document.getElementById('google-fonts-css');
if (fontLink) {
  fontLink.media = 'all';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
