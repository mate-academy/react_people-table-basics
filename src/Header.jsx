import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="nav">
      <Link
        className="nav__link"
        to="/"
      >
        <h2 className="nav__title">Home page</h2>
      </Link>
      <Link
        className="nav__link"
        to="/people"
      >
        <h2 className="nav__title">People page</h2>
      </Link>
    </nav>
  </header>
);
