import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/people">People</Link>
          </li>
        </ul>
      </nav>
    </header>
);
