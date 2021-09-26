import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav
    className="navbar-menu"
  >
    <Link className="navbar-item card-header-title" to="/home">
      Home
    </Link>
    <Link className="navbar-item card-header-title" to="/people">
      People
    </Link>
  </nav>
);

export default Header;
