import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const NavLinkItem: React.FC<Props> = ({ to, title }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={to}
  >
    {title}
  </NavLink>
);
