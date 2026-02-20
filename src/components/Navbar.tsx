import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    data-cy="nav"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
