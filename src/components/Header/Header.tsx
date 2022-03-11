import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/people">People</Link>
  </nav>
);

export default Header;
