import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

const getClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Layout = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getClass} to="/">
              Home
            </NavLink>

            <NavLink className={getClass} to="people">
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
    </>
  );
};
