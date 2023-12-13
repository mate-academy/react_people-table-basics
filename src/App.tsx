import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { PeopleTable } from './components/People/people';

export const App = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );
  };

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
            <NavLink to="/" className={getNavClass}>
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getNavClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<PeopleTable />}>
              <Route path=":slug" />
            </Route>
            <Route
              path="/*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
