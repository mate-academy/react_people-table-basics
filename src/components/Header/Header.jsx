import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <nav className="header__nav">
    <ul className="header__list">
      <li className="header__item">
        <Link className="header__link" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="header__link" to='/people'>
          People
        </Link>
      </li>
    </ul>
  </nav>
);
