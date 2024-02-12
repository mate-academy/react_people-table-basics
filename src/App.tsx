import './App.scss';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeopleTable } from './components/PeopleTable';
import { HomePage } from './components/HomePage';

export const App = () => {
  const activeLink
    = ({ isActive }: { isActive: boolean }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );

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
              className={activeLink}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={activeLink}
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
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route path=":slug?" element={<PeopleTable />} />
              </Route>
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
