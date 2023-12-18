import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import cn from 'classnames';

import './App.scss';
import { PeopleList } from './components/PeopleList/PeopleList';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

const ACTIVE_LINK = 'has-background-grey-lighter';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    [ACTIVE_LINK]: isActive,
  });
};

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
            className={getLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={getLinkClass}
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
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/people"
          >
            <Route index element={<PeopleList />} />
            <Route
              path=":personName"
              element={<PeopleList />}
            />
          </Route>
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </div>
    </main>
  </div>
);
