import {
  Routes, Route, Navigate,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFouundPage';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">

        <NavBar />

      </div>
    </nav>

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people" element={<PeoplePage />} />

          <Route path="*" element={<NotFoundPage />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />

            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>

      </div>
    </main>
  </div>
);
