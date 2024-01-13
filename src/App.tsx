import {
  NavLink, Routes, Route, Navigate,
} from 'react-router-dom';

import './App.scss';
import { PeopleTable } from './components/PeopleTable';

export const App = () => {
  const isNavLinkActive = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'navbar-item has-background-grey-lighter'
      : 'navbar-item';
  };

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
            <NavLink className={isNavLinkActive} to="/">
              Home
            </NavLink>

            <NavLink
              className={isNavLinkActive}
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

            <Route path="/" element={<h1 className="title">Home Page</h1>} />

            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleTable />
                </>
              )}
            >
              <Route path=":personSlug" element={<PeopleTable />} />
            </Route>

            <Route path="/home" element={<Navigate to="/" replace />} />

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
