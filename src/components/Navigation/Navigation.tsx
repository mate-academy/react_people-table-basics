import { NavLink } from 'react-router-dom';
import { getNavLinkClassnames } from '../../services/getNavLinkClassnames';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getNavLinkClassnames} to="/">
          Home
        </NavLink>

        <NavLink
          className={getNavLinkClassnames}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
