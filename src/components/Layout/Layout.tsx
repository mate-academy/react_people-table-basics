import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  function getClassName({ isActive }: { isActive: boolean }) {
    return isActive
      ? 'navbar-item  has-background-grey-lighter'
      : 'navbar-item';
  }

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar  has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getClassName} to="/">
              Home
            </NavLink>

            <NavLink className={getClassName} to="/people">
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
