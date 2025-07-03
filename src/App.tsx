import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Error } from './components/Error/Error';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import './App.scss';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Home fica ativo quando estamos na rota '/' (quando foi clicado)
  const isActive =
    location.pathname === '/' || location.pathname.startsWith('/people');

  const handleHomeClick = () => {
    navigate('/');
  };

  const handlePeopleClick = () => {
    navigate('/people');
  };

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
            <Link
              to="/"
              className={`navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
              onClick={handleHomeClick}
            >
              Home
            </Link>

            <Link
              to="/people"
              className={`navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
              onClick={handlePeopleClick}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people" element={<Error />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
