import { Route, Routes, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';
import { Homepage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
