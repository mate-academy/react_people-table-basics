import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="#/">
            Home
          </a>

          <a
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personId" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
