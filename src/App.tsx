import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import classnames from 'classnames';

import './App.scss';
import { PeopleTable } from './components/Loader/PeopleTable/PeopleTable';

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
            className={({ isActive }) => {
              return classnames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => {
              return classnames('navbar-item', {
                'has-background-grey-lighter': isActive,
              });
            }}
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
          <Route path="/home" element={<Navigate to={'/'} />} />
          <Route path="/people" element={<PeopleTable />}>
            <Route path="/people/:slug" element={<PeopleTable />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
