import './App.scss';
import {
  NavLink, Routes, Route, Navigate,
} from 'react-router-dom';
import cn from 'classnames';
import { Home } from './components/Home';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
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
          <NavLink
            className={getLinkClass}
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
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
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
