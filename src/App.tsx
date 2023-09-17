import './App.scss';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import { PeopleTabs } from './components/peopleTabs';

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
              to="/"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">

          <div className="block">
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route index element={(<PeopleTabs />)} />
                <Route path=":personSlug" element={(<PeopleTabs />)} />
              </Route>
              <Route
                path="*"
                element={
                  <h1 className="title">Page not found</h1>
                }
              />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};
