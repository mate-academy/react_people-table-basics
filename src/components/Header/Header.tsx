import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const activeItem = 'main-navigation__item--active';

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li className="main-navigation__item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeItem : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li className="main-navigation__item">
          <NavLink
            to="/people"
            className={({ isActive }) => (isActive ? activeItem : undefined)}
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
