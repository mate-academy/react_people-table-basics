import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="navbar-item">
          Home
        </NavLink>

        <NavLink to="people" className="navbar-item">
          People Page
        </NavLink>
      </nav>
    </header>
  );
};
