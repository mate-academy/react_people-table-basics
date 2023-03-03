import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string,
  title: string,
};

export const NavLinkPage:React.FC<Props> = ({ link, title }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={link}
  >
    {title}
  </NavLink>
);
