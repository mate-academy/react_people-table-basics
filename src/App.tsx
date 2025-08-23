import './App.scss';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';

export const App = () => {
  // цього класу не вистача шоб виглядало як на референсі.
  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.add('has-navbar-fixed-top');

    return () => {
      htmlElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={({ isActive }) =>
                'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
              }
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

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
};
