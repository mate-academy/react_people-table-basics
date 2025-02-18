import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div className="navbar-brand">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navbar-item ${isActive ? ' has-background-grey-lighter' : ''}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) =>
          `navbar-item ${isActive ? ' has-background-grey-lighter' : ''}`
        }
      >
        People
      </NavLink>
    </div>
  );
};
