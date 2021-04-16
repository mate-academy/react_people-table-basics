import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => (
  <div className="Navigation">
    <NavLink to="/home" activeClassName="Active">Home</NavLink>
    <NavLink to="/people" activeClassName="Active">People</NavLink>
  </div>
);
