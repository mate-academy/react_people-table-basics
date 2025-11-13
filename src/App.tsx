// import { Loader } from './components/Loader';

import './App.scss';
import { PeopleTable } from './components/PeopleTable';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

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
              className={({ isActive }) =>
                ['navbar-item', isActive && 'has-background-grey-lighter']
                  .filter(Boolean)
                  .join(' ')
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                ['navbar-item', isActive && 'has-background-grey-lighter']
                  .filter(Boolean)
                  .join(' ')
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
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            ></Route>

            <Route path="/home" element={<Navigate to={'/'} replace />}></Route>

            <Route path="/people">
              <Route index element={<PeopleTable />}></Route>

              <Route path=":slug" element={<PeopleTable />}></Route>
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            ></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
