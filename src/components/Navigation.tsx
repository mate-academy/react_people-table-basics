import { NavLink } from 'react-router-dom';
import { getClassNames } from '../utils/GetClassNames';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getClassNames} to="/">
          Home
        </NavLink>

        <NavLink className={getClassNames} to="/people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
