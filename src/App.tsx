import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import classnames from 'classnames';
import { TablePeople } from './components/TablePeople';

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
              className={({ isActive }) => classnames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="people"
              className={({ isActive }) => classnames('navbar-item', {
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
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="people"
            >
              <Route index element={<TablePeople />} />
              <Route path=":slug" element={<TablePeople />} />
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
