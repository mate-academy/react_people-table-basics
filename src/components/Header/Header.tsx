import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <nav className="nav">
      <div>
        <NavLink className="button is-success mr-5" to="/">
          Home
        </NavLink>

        <NavLink className="button is-danger" to="/people">
          People
        </NavLink>
      </div>
    </nav>
  );
};
