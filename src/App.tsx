import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import './App.scss';
import { useContext } from 'react';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { classChange } from './utils/classChange';
import { PeopleContext } from './PeopleContext';

export const App = () => {
  const { setIsPageActive } = useContext(PeopleContext);

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
              className={classChange}
              to="/"
              onClick={() => setIsPageActive(false)}
            >
              Home
            </NavLink>

            <NavLink
              className={classChange}
              to="/people"
              onClick={() => setIsPageActive(true)}
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
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personSlug?" />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="home" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
