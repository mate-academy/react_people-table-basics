import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="navbar is-fixed-top is-light">
    <div className="navbar-brand">
      <Link className="navbar-item is-tab" to="/home">Home</Link>
      <Link className="navbar-item is-tab" to="/people">People</Link>
    </div>
  </nav>
);
