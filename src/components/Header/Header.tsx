import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const activeItem = 'main-navigation__item main-navigation__item--active';
  const inActiveItem = 'main-navigation__item';

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeItem : inActiveItem)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className={({ isActive }) => (isActive ? activeItem : inActiveItem)}
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
