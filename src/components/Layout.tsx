import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
            <NavLink className={getLinkActive} to="/">
              Home
            </NavLink>

            <NavLink className={getLinkActive} to="people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
