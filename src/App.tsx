// import { Loader } from './components/Loader';

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/people"
            element={<PeoplePage />}
          />

          <Route
            path="/people/:slug"
            element={<PeoplePage />}
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
