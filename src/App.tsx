import classNames from 'classnames';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

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
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="people"
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
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
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeopleTable />} />
            <Route path=":slug" element={<PeopleTable />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
