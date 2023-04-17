import { Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
