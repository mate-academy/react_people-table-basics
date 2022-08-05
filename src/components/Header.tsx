import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="container">
      <nav className="navbar">
        <NavLink to="/" className="navbar-item">
          Home Page
        </NavLink>

        <NavLink to="/people" className="navbar-item">
          People Table
        </NavLink>
      </nav>
    </header>
  );
};
