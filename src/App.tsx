import './App.scss';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';

export const App = () => {
  const location = useLocation();

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
              className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive || location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
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
