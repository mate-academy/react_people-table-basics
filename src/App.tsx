import cn from 'classnames';
import './App.scss';
// import { Person } from './types';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Error } from './components/Error';
import { PeoplePage } from './components/PeoplePage';

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
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
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
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":peopleSlug" element={<PeoplePage />} />
            </Route>
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </main>

    </div>
  );
};
