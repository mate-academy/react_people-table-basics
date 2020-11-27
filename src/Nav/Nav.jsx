import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export const Nav = () => (
  <nav className="header__nav nav">
    <ul className="nav__list">
      <li className="nav__item">
        <Link to="/" className="nav__link">
          Home page
        </Link>
      </li>
      <li className="nav__item">
        <Link to="/people" className="nav__link">
          People page
        </Link>
      </li>
    </ul>
  </nav>
);
