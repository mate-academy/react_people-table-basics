import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="Header">
    <nav className="Nav">
      <Link to="/home" className="Nav Nav__link">Home</Link>
      <Link to="/people" className="Nav Nav__link">People</Link>
    </nav>
  </header>
);
