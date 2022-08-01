import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar-item">
          Home Page
        </Link>

        <Link to="/home" className="navbar-item">
          Test redirection from HOME
        </Link>

        <Link to="/people" className="navbar-item">
          People Page
        </Link>
      </nav>
    </header>
  );
};
