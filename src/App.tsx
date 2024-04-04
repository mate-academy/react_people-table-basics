import './App.scss';
import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom';
import cn from 'classnames';

export const App = () => {
  const { currentId } = useParams();

  if (currentId === 'home') {
    return <Navigate to=".." replace={true} />;
  }

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
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                cn('navbar-item', { 'has-background-grey-lighter': isActive })
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
          <Outlet />
        </div>
      </main>
    </div>
  );
};
