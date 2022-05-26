import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__item">
        <Link to="/" className="navbar__item-link">
          Home page
        </Link>

        <Link to="/people" className="navbar__item-link">
          People page
        </Link>
      </div>
    </nav>
  );
};
