import React from 'react';
import { NavigationLink } from '../NavigationLink/NavigationLink';

export const Navigation: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink to="/" title="Home" />
          <NavigationLink to="/people" title="People" />
        </div>
      </div>
    </nav>
  );
};
