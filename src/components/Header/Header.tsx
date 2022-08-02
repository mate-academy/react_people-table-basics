import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Home
        </Link>

        <Link to="/people" className="navbar-item">
          People
        </Link>
      </div>
    </div>
  </nav>
);
