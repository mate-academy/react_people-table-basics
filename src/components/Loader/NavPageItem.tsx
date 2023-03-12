import classNames from 'classnames';
import React from 'react';

import { NavLink } from 'react-router-dom';

type Props = {
  link: string,
  text: string,
};

export const NavPageItem: React.FC<Props> = ({ link, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={link}
  >
    {text}
  </NavLink>
);
