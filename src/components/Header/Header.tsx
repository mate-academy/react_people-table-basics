import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

interface Status {
  isActive: boolean;
}

export const Header: React.FC = () => {
  const getLinkStyle = (status: Status): React.CSSProperties => {
    return status.isActive ? { backgroundColor: '#fff' } : {};
  };

  return (
    <div className="container">
      <nav className="header">
        <NavLink
          to="/"
          style={getLinkStyle}
          className="header__link"
        >
          Home
        </NavLink>

        <NavLink
          to="/people-page"
          style={getLinkStyle}
          className="header__link"
        >
          People Page
        </NavLink>
      </nav>
    </div>
  );
};
