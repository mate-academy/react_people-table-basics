import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <div className="container">
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home Page
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/people">
            People Page
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
