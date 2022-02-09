import React from 'react';
import { Link } from 'react-router-dom';

export const MainNaviganion: React.FC = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navdar-brand">
          <Link className="navbar-item" to="/">
            LOGO
          </Link>
          <Link className="navbar-item" to="/home">
            Home page
          </Link>
          <Link className="navbar-item" to="/people">
            Peope page
          </Link>
        </div>
      </nav>
    </div>
  );
};
