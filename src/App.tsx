import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';

import './App.scss';

const HomePage = () => <h1 className="title">Home Page</h1>;
const NotFoundPage = () => <h1 className="title">Page not found</h1>;

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
                `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
              }
              to="/"
              end
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
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
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
