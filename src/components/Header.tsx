import { Link } from 'react-router-dom';

export const Header = () => (
  <nav className="navbar-menu">
    <Link to="/home" className="navbar-item">
      Home
    </Link>
    <Link to="/people" className="navbar-item">
      People
    </Link>
  </nav>
);
