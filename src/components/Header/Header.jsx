import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <div className="Navigation">
    <NavLink to="/home" className="link" activeClassName="Active">Home</NavLink>
    <NavLink
      to="/people"
      className="link"
      activeClassName="Active"
    >
      People
    </NavLink>
  </div>
);
