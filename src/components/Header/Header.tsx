import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <NavLink
          className="navbar__item"
          to="/"
        >
          Home page
        </NavLink>
        <NavLink
          className="navbar__item"
          to="/people"
        >
          People page
        </NavLink>
      </div>
    </nav>
  );
};
