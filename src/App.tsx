import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './components/Loader/PeoplePage';

import './App.scss';

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
            to="/"
            className={({ isActive }) => (
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => (
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            )}
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
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people" element={<PeoplePage />}>
            <Route path=":selectedPerson" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
