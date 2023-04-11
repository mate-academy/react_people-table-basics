import React from 'react';
import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Block } from './components/Block/Block';
import { NavList } from './components/NavList/NavList';

export const App: React.FC = () => {
  return (
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
              <Route
                index
                element={(
                  <Block />
                )}
              />

              <Route
                path=":personSlug"
                element={(
                  <Block />
                )}
              />
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
};
