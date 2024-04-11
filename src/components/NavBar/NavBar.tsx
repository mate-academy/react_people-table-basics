import { NavLink } from 'react-router-dom';
import { getIsActive } from '../../utils/getIsActive';

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
          <NavLink className={getIsActive} to="/">
            Home
          </NavLink>

          <NavLink className={getIsActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
