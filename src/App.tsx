import './App.scss';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { NotFindPage } from './components/Loader/NotFindPage';

const isActiveLink = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname + location.hash === '/home') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

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
            <NavLink className={isActiveLink} to="/">
              Home
            </NavLink>

            <NavLink
              className={isActiveLink}
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
            <Route path="/people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFindPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
