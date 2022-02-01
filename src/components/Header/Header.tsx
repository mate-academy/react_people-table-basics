import React from 'react';
import './Header.scss';

import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/home"
            className="nav__link"
          >
            Home page
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            to="/people"
            className="nav__link"
          >
            People page
          </NavLink>
        </li>
      </ul>
    </nav>

  );
};
