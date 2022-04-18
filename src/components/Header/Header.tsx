import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Header.scss';

export const Header:React.FC = React.memo(() => {
  return (
    <header>
      <nav>
        <ul className="navLink">
          <li>
            <NavLink
              to="/"
              className={
                ({ isActive }) => cn({ link_isActive: isActive }, 'link')
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="people"
              className={
                ({ isActive }) => cn({ link_isActive: isActive }, 'link')
              }
            >
              People
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});
