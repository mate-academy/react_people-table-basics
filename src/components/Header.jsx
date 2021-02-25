import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav className="navbar">
      <p className="App">
        <Link className="navbar__item" to="/">
          Home
        </Link>
      </p>

      <p>
        <Link
          className="navbar__item"
          to="/people"
        >
          People
        </Link>
      </p>
    </nav>
  </header>
);
