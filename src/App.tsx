import './App.scss';
import { PeopleList } from './components/UserList';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import cn from 'classnames';

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
              className={({ isActive }) => {
                return cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => {
                return cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
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
            <Route path="/">
              <Route index element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="people" element={<PeopleList />}>
                <Route index />
                <Route path=":personSlug?" />
              </Route>
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
