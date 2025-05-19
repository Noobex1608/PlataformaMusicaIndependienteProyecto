import React from 'react';
import ReactDOM from 'react-dom/client';
import ArtistModule from './components/ArtistModule';
import './styles.css'; 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ArtistModule />
  </React.StrictMode>
);