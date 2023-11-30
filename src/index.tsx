import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { PeopleProvider } from './context/PeopleContext';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <React.StrictMode>
      <PeopleProvider>
        <Router>
          <App />
        </Router>
      </PeopleProvider>
    </React.StrictMode>,

  );
