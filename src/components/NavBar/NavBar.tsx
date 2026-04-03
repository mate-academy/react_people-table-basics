import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item'
        }
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        // className="navbar-item has-background-grey-lighter"
        className={({ isActive }) =>
          isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item'
        }
        to="/people"
      >
        People
      </NavLink>
    </>
  );
};
