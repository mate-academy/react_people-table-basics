import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/PageNotFound';
import classNames from 'classnames';
import './App.scss';

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
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              Home
            </NavLink>
            <NavLink
              to="people"
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
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
            <Route path="/home" element={<Navigate to="/" replace={true} />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
// comment for new commit
