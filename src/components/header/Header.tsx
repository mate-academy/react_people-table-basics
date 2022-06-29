import { NavLink } from 'react-router-dom';

export const Header = () => (
  <nav>
    <NavLink
      to="/"

    >
      Home
    </NavLink>
    <NavLink
      to="/people"

    >
      People
    </NavLink>
  </nav>
);
