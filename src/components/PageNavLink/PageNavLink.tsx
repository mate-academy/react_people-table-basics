import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string,
  tab: string,
}

export const PageNavLink: React.FC<Props> = ({ to, tab }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {tab}
  </NavLink>
);
