import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar">
      <NavLink className="navbar-item" to="/">Home page</NavLink>
      <NavLink className="navbar-item" to="/people">People page</NavLink>
    </nav>
  </header>
);
