import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="Header">
      <nav className="Nav Header__nav">
        <Link to="/" className="Nav__link">
          Home
        </Link>

        <Link to="/people" className="Nav__link">
          People
        </Link>
      </nav>
    </header>
  );
};
