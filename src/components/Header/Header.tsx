import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item is-tab"
          >
            Home
          </Link>

          <Link
            to="/people"
            className="navbar-item is-tab"
          >
            People
          </Link>
        </div>
      </nav>
    </header>
  );
};
