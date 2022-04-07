import './MainNav.scss';
import { Link } from 'react-router-dom';

export const MainNav: React.FC = () => {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link">
        Home
      </Link>

      <Link to="/people" className="nav__link">
        People
      </Link>
    </nav>
  );
};
