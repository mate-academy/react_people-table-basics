import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { NavList } from './components/NavList';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavList />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route
            path="/people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <Outlet />
              </>
            )}
          >
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
