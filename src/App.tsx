import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${
              pathname === '/' ? 'has-background-grey-lighter' : ''
            }`}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={`navbar-item ${
              pathname.startsWith('/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
