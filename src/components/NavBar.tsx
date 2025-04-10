import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getActiveClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getActiveClassName} to="/">
            Home
          </NavLink>

          <NavLink className={getActiveClassName} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
