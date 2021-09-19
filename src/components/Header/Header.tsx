import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <ul className='nav'>
    <NavLink
      to="/"
      className='nav-link'
      activeClassName='active'
    >
      Home page
    </NavLink>
    <NavLink 
      to="/people"
      className='nav-link'
      activeClassName='active'
    >
      People Page
    </NavLink>
  </ul>
  )
};