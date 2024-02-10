import './App.scss';
import { useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash === '#/home') {
      navigate('/');
    }
  }, [navigate]);

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
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            <NavLink to="/people" className={getLinkClass}>People</NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path="/people/:slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
