import './App.scss';
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { PeoplePage } from './components/Loader/PeoplePage';
import { HomePage } from './components/Loader/HomePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';

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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
