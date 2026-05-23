import './App.scss';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { PageNotFound } from './pages/PageNotFound';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

export const App = () => {
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
                `navbar-item ${isActive ? ' has-background-grey-lighter' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive ? ' has-background-grey-lighter' : ''}`
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
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:personSlug" element={<People />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
