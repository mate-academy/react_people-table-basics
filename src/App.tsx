import classNames from 'classnames';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
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
          <NavLink className={getLinkClass} to="/">
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
        <div className="block">
          <div className="box table-container">

            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PeoplePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
