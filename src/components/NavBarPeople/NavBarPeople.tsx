import { NavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

export const NavBarPeople: React.FC = () => {
  return (
    <NavLink
      to="/people"
      className={({ isActive }) =>
        classNames('navbar-item', {
          'has-background-grey-lighter': isActive,
        })
      }
    >
      People
    </NavLink>
  );
};
