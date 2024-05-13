import { NavLink, Navigate, useLocation } from 'react-router-dom';

import { getActiveClassName } from '../../utils';

export const Navigation = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getActiveClassName}>
            Home
          </NavLink>

          <NavLink to="/people" className={getActiveClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
