import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import './App.scss';
import Home from './Home';
import PeoplePage from './PeoplePage';
import NotFoundPage from './components/NotFoundPage';

export const App = () => {
  return (
    <>
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
                className={({ isActive }) =>
                  isActive
                    ? 'navbar-item has-background-grey-lighter'
                    : 'navbar-item'
                }
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'navbar-item has-background-grey-lighter'
                    : 'navbar-item'
                }
                to="/people"
              >
                People
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      <div className="section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};
