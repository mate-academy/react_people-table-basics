import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { People } from './components/People';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route
            path="/"
            element={(<HomePage />)}
          />

          <Route
            path="/home"
            element={
              <Navigate to="/" replace />
            }
          />

          <Route
            path="/people"
            element={(<People />)}
          />

          <Route
            path="/people/:slug"
            element={(<People />)}
          />

          <Route
            path="*"
            element={(<PageNotFound />)}
          />
        </Routes>
      </div>
    </main>
  </div>
);
