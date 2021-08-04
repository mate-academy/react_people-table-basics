import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <NavLink
        to="/"
        exact
        className="header__link"
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        className="header__link"
      >
        People
      </NavLink>
    </div>
  );
}
