import classNames from 'classnames';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable';
import './App.scss';

export const App = () => {
  const activeClass = ({ isActive }: { isActive: boolean }) => {
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
            <NavLink className={activeClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={activeClass}
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
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/people" element={<PeopleTable />} />
            <Route path="/people/:personSlug" element={<PeopleTable />} />
            <Route path="/home" element={<Navigate to="/" />} />
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
