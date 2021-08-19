import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <NavLink className="nav-link" exact to="/">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/people">People</NavLink>
    </li>
  </ul>
);
