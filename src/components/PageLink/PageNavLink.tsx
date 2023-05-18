import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  name: string;
}

export const PageNavLink: React.FC<Props> = ({ to, name }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (
      classNames(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )
    )}
  >
    {name}
  </NavLink>
);
