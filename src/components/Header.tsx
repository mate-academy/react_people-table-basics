import React from 'react';
import { NavLink } from 'react-router-dom';
import { Status } from '../type/type';

const getLinkStyle = (status: Status): React.CSSProperties => {
  return status.isActive ? { backgroundColor: '#ccc' } : {};
};

export const Header = () => {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        style={getLinkStyle}
        className="nav__page"
      >
        Home
      </NavLink>

      <NavLink
        to="people"
        style={getLinkStyle}
        className="nav__page"
      >
        People
      </NavLink>
    </nav>
  );
};
