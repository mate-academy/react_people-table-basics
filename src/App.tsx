import React from 'react';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Page } from './types/Page';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path={Page.home}
            element={<h1 className="title">Home page</h1>}
          />
          <Route
            path={Page.people}
            element={<h1 className="title">People page</h1>}
          />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path={Page.people} element={<PeoplePage />}>
            <Route index element={<PeoplePage />} />
            <Route path=":tabId" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
