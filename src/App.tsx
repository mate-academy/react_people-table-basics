import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { People } from './components/People/People/People';
import { NavBar } from './components/NavBar/NavBar';

import './App.scss';

export const App: FC = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route
            path="/people"
            element={(
              <>
                <h1 className="title">People Page</h1>
                <People />
              </>
            )}
          >
            <Route path=":slug" element={<People />} />
          </Route>

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
        </Routes>
      </div>
    </main>
  </div>
);
