import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            exact
            className="navigation__link"
            activeClassName="navigation__link--active"
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/people"
            className="navigation__link"
            activeClassName="navigation__link--active"
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
