import './App.scss';
import cn from 'classnames';
import {
  NavLink, Outlet, HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

const activeClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const App: React.FC = () => (
  <Router>
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>

            <NavLink to="/people" className={activeClass}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Outlet />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route index element={<h1 className="title">Home Page</h1>} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  </Router>
);
