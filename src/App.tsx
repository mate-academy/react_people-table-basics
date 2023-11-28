import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeadOfTable } from './components/HeadOfTable/HeadOfTable';
import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <HeadOfTable />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="people">
                <Route path=":personSlug?" element={<PeoplePage />} />
              </Route>
              <Route path="home" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
