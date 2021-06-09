import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <nav className="header__nav">
    <ul className="header__list">
      <li className="header__item">
        <Link
          className="header__link"
          to="react_people-table-basics/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="header__link"
          to='react_people-table-basics/people'
        >
          People
        </Link>
      </li>
    </ul>
  </nav>
);
