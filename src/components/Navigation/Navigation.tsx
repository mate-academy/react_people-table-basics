import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation:React.FC = () => (
  <div className="container">
    <div className="navbar-brand">
      <NavLink
        className={({ isActive }) => (
          cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )
        )}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (
          cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          )
        )}
        to="/people"
      >
        People
      </NavLink>
    </div>
  </div>
);
