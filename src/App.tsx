import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { PeopleList } from './components/PeopleList/PeopleList';

const getNavStyles = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

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
            <NavLink className={getNavStyles} to="/">
              Home
            </NavLink>

            <NavLink
              className={getNavStyles}
              to="people"
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
              path="people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleList />
                </>
              )}
            >
              <Route path=":personSlug" element={<PeopleList />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
