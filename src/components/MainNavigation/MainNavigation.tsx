import { Link } from 'react-router-dom';
import './MainNavigation.scss';

export const MainNavigation = () => {
  return (
    <nav className="navbar is-primary is-spaced">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item nav__link">
          Home
        </Link>

        <Link to="/people" className="navbar-item nav__link">
          People
        </Link>
      </div>
    </nav>
  );
};
