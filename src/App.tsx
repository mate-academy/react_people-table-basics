import './App.scss';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const HomePage = () => <h1 className="title">Home Page</h1>;
  const NotFoundPage = () => <h1 className="title">Page not found</h1>;

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
              end
              className={({ isActive }) =>
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
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
          <div className="block">
            <div className="box table-container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/people/:personSlug" element={<PeoplePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
