import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar is-primary">
      <NavLink
        className="navbar-item"
        to="home"
      >
        Home
      </NavLink>

      <NavLink
        className="navbar-item"
        to="people"
      >
        People
      </NavLink>
    </nav>
  );
};
