import { NavLink } from 'react-router-dom';

const isActiveLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

export const NavBar = () => {
  return (
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

          <NavLink className={isActiveLink} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
