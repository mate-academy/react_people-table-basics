import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { People } from './components/People';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route
            path="/"
            element={(<h1 className="title">Home Page</h1>)}
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
            element={(<h1 className="title">Page not found</h1>)}
          />
        </Routes>
      </div>
    </main>
  </div>
);
