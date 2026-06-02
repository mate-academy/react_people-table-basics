import { Navigate, Routes, Route, NavLink } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

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
              className={({ isActive }) =>
                isActive ? 'has-background-grey-lighter' : ''
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'has-background-grey-lighter' : ''
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
            <Route path="/home" element={<Navigate to={'/'} replace />} />
            <Route path="/" element={<HomePage title={'Home Page'} />} />
            <Route path="/people">
              <Route index element={<PeoplePage title={'People Page'} />} />
              <Route
                path=":slug"
                element={<PeoplePage title={'People Page'} />}
              />
            </Route>
            <Route
              path="*"
              element={<NotFoundPage title={'Page not found'} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
