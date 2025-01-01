import { createRoot } from 'react-dom/client';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>,
);
