import { NavLink } from 'react-router-dom';

export const Header = () => (
  <div className="tabs is-boxed">
    <ul className="nav nav-tabs">
      <li>
        <NavLink
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="people"
        >
          People table
        </NavLink>
      </li>
    </ul>
  </div>
);
