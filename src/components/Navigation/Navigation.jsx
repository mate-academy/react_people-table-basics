import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-brand container">
        <Link className="navbar-item" to="/">
          Home
        </Link>
        <Link className="navbar-item" to="/people">
          People
        </Link>
      </div>
    </nav>
  );
}
