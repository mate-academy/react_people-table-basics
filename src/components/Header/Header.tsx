import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="Header">
      <nav className="Header__navbar">
        <div className="Header__list">
          <Link to="/home" className="Header__item">
            Home
          </Link>
          <Link to="/people" className="Header__item">
            People
          </Link>
        </div>
      </nav>
    </header>
  );
};
