import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeopleTable';

const HomePage = () => (
  <div className="container">
    <h1 className="title">Home Page</h1>
  </div>
);

const PageNotFound = () => (
  <div className="container">
    <h1 className="title">Page not found</h1>
  </div>
);

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
                'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                'navbar-item' + (isActive ? ' has-background-grey-lighter' : '')
              }
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};
