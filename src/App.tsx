import './App.scss';
import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

export const App = () => (
  // eslint-disable-next-line react/jsx-no-comment-textnodes
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
            className={
              ({ isActive }) => cn(
                'navbar-item', {
                  'has-background-grey-lighter': isActive,
                },
              )
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={
              ({ isActive }) => cn(
                'navbar-item', {
                  'has-background-grey-lighter': isActive,
                },
              )
            }
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
          <Route path="/home" element={<Navigate to="/" />} />
          <Route index element={<HomePage />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
