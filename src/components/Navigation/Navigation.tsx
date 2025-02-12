import classNames from 'classnames';
import { Outlet, NavLink } from 'react-router-dom';

export const Navigation = () => {
  const getLinkClassname = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
            <NavLink to="/" className={getLinkClassname}>
              Home
            </NavLink>

            <NavLink className={getLinkClassname} to="people">
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
