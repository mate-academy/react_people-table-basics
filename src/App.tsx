import {
  Navigate,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { People } from './components/People';

const getIsActive = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', { 'has-background-grey-lighter': isActive })
);

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
              className={getIsActive}
            >
              Home
            </NavLink>

            <NavLink
              className={getIsActive}
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
              <Route index element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people/" element={<People />}>
                <Route path=":slug" element={<People />} />
              </Route>
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </div>

      </main>
    </div>
  );
};
