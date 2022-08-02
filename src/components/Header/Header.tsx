import React from 'react';
import { NavLink } from 'react-router-dom';

interface Status {
  isActive: boolean,
}

export const Header: React.FC = () => {
  const getLinkStyle = (status: Status): React.CSSProperties => {
    return status.isActive ? { backgroundColor: '#ccc' } : {};
  };

  return (
    <div className="box">
      <nav className="nav">
        <NavLink
          to="/"
          style={getLinkStyle}
          className="nav__link"
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          style={getLinkStyle}
          className="nav__link"
        >
          People
        </NavLink>
      </nav>
    </div>
  );
};
