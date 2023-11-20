import { NavLink, Outlet } from 'react-router-dom';

export const App = () => {
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
              to="/"
              className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item has-background-grey-lighter' : ''}`}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item has-background-grey-lighter' : ''}`}
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
