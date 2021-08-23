import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <div className="header">
    <NavLink to="/" className="nav-link" exact>
      Home page
    </NavLink>
    <NavLink to="/people" className="nav-link" exact>
      People
    </NavLink>
  </div>
);
