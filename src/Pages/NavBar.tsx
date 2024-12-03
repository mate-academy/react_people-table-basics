import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../utils/utils';

export const NavBar = () => (
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
            getLinkClass(isActive, 'navbar-item', 'has-background-grey-lighter')
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            getLinkClass(isActive, 'navbar-item', 'has-background-grey-lighter')
          }
          to="/people"
          end
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
