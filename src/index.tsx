// incluindo PR
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss'; // A importação correta do arquivo de estilos

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
