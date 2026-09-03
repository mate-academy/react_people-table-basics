import './App.scss';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { PeoplePage } from './components/Loader/PeoplePage';

export const App: React.FC = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

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
              className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
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
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={null} />
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
