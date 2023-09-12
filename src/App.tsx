import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import cn from 'classnames';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

const linkClass = ({ isActive }: { isActive: boolean }) => cn(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

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
          <NavLink
            to="/"
            className={linkClass}
          >
            Home
          </NavLink>
          <NavLink
            className={linkClass}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            index
            element={<HomePage />}
          />
          <Route path="people">
            <Route
              path=":slug?"
              element={<PeoplePage />}
            />
          </Route>

          <Route
            path="home"
            element={(
              <Navigate
                to="/"
                replace
              />
            )}
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
