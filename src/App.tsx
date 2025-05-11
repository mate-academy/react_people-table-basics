import './App.scss';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Перевіряємо, чи поточне посилання - це "/home"
    if (location.pathname === '/home') {
      navigate('/'); // Редірект на "/"
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
            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
