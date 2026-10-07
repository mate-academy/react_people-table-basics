import { Routes, Route, Navigate, NavLink, useMatch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.scss';

export const App = () => {
  // Для NavLink "People" нам нужно, чтобы он был активным и на /people, и на /people/:slug
  const isPeopleActive = useMatch('/people/*');

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
              to="/"
              end
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
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

            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
