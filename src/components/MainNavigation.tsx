import React from 'react';
import { NavLink } from 'react-router-dom';

export const MainNavigation: React.FC = () => (

  <div className="tabs">
    <ul>
      <NavLink to="/people" className="navbar-item is-tab">
        People
      </NavLink>
      <NavLink to="/" className="navbar-item is-tab">
        Home
      </NavLink>
    </ul>
  </div>

);
