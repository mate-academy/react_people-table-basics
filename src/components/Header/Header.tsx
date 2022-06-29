import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <nav className="Header__nav">
        <Link to="/" className="Header__link">Home</Link>
        <Link to="/people" className="Header__link">People</Link>
      </nav>
    </div>
  );
};
