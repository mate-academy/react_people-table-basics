import React from 'react';
import { NavBarItem } from '../NavBarItem';

export const NavBar: React.FC = () => (
  <div className="navbar-brand">
    <NavBarItem path="/" title="Home" />

    <NavBarItem path="/people" title="People" />
  </div>
);
