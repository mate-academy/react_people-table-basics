import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

export const App:React.FC = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <Navigation />
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />
          <Route
            path="/home"
            element={
              <Navigate to="/" replace />
            }
          />
          <Route
            path="/people"
          >
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route
            path="*"
            element={
              <h1 className="title">Page not found</h1>
            }
          />
        </Routes>
      </div>
    </main>
  </div>
);
