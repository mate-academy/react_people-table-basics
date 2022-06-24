import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="tabs is-centered ml-0">
    <ul className="ml-0">
      <li className="title is-4 pb-0 navbar-item mr-2 mb-0">
        <NavLink
          to="/"
          className={({ isActive }) => (
            isActive ? 'has-text-link' : 'has-text-grey-dark'
          )}
        >
          Home page
        </NavLink>
      </li>

      <li className="title is-4 pb-0 navbar-item">
        <NavLink
          to="/people"
          className={({ isActive }) => (
            isActive ? 'has-text-link' : 'has-text-grey-dark'
          )}
        >
          People page
        </NavLink>
      </li>
    </ul>
  </nav>
);
