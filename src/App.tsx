import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import cn from 'classnames';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

interface NavLinkProps {
  isActive?: boolean;
}

export const App: React.FC = () => {
  const getClass = ({ isActive }: NavLinkProps) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
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
            <NavLink className={getClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getClass}
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":personSlug?" element={<PeoplePage />} />
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
