import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/global.css';
import { LocationProvider } from './providers/LocationProvider.tsx';
import { GeoApiProvider } from './providers/GeoApiProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocationProvider>
      <GeoApiProvider>
        <App />
      </GeoApiProvider>
    </LocationProvider>
  </React.StrictMode>
);
