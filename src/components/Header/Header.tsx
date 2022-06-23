import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="tabs is-centered">
    <ul>
      <li>
        <NavLink
          to="/"
          className="navbar-item"
        >
          Home page
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/people"
          className="navbar-item"
        >
          People page
        </NavLink>
      </li>
    </ul>
  </nav>
);
