import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/people">
              People
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
