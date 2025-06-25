import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              data-cy="nav"
              to="/"
              className={({ isActive }) =>
                isActive || location.pathname === '/'
                  ? 'navbar-item is-active has-background-grey-lighter'
                  : 'navbar-item'
              }
            >
              Home
            </NavLink>
            <NavLink
              data-cy="nav"
              to="/people"
              className={({ isActive }) =>
                isActive || location.pathname.startsWith('/people')
                  ? 'navbar-item is-active has-background-grey-lighter'
                  : 'navbar-item'
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
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

          <Outlet />
        </div>
      </main>
    </div>
  );
};
