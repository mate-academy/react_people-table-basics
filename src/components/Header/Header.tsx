import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: FC = () => {
  return (
    <header className="Header">
      <nav className="Nav Header__nav">
        <NavLink to="/" className="Nav__link">
          Home
        </NavLink>

        <NavLink to="/people" className="Nav__link">
          People
        </NavLink>
      </nav>
    </header>
  );
};
