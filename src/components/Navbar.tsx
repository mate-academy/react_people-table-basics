import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav
    className="navbar is-light mb-4"
    data-cy="nav"
  >
    <div className="navbar-brand">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `navbar-item ${
            isActive ? 'has-background-grey-lighter' : ''
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) =>
          `navbar-item ${
            isActive ? 'has-background-grey-lighter' : ''
          }`
        }
      >
        People
      </NavLink>
    </div>
  </nav>
);
