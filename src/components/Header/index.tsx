import { NavLink } from 'react-router-dom';
import './header.scss';

interface LinkIsActive {
  isActive: boolean
}

const LinkClasses = ({ isActive }: LinkIsActive) => `header-nav__link ${isActive ? 'header-nav__link--active' : ''}`;

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <nav className="header-nav">
            <NavLink
              to="/"
              className={LinkClasses}
            >
              Home
            </NavLink>
            <NavLink
              to="/people"
              className={LinkClasses}
            >
              People
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
