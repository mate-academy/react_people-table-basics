import React from 'react';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/people">People</Link>
    </nav>
  );
};
