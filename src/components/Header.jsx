import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <nav className="nav">
      <NavLink to="/" className="link" activeClassName="active" exact>
        Home
      </NavLink>
      <NavLink to="/people" className="link" activeClassName="active">
        People
      </NavLink>
      <div className="line" />
    </nav>
  </header>
);
