import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', {
    'has-background-grey-lighter': isActive,
  },
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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass}>
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
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" />
            </Route>
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
