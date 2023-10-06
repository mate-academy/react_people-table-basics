/* eslint-disable max-len */
import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeadOfTable } from './components/Table/Table';
import { Navigation } from './components/Navi/Navigation';
import { PeoplePage } from './components/People/PeoplePage';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <HeadOfTable />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<h1 className="title">Home Page</h1>} />
              <Route path="*">
                <Route index element={<h1 className="title">Page not found</h1>} />
              </Route>
              <Route path="people" element={<PeoplePage />}>
                <Route path=":personSlug" element={<PeoplePage />} />
              </Route>
              <Route path="home" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
