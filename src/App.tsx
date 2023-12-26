import './App.scss';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import cn from 'classnames';
import { Homepage } from './pages/Homepage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFound';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })
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
            <Route path="" element={<Homepage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="/people/" element={<PeoplePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
