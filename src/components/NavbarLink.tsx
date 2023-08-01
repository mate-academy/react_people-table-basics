import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../types/Pages';
import { getLinkClass, getLinkStyle } from './utils/taskUtils';

type Props = {
  page: string;
};

export const NavbarLink: React.FC<Props> = ({ page }) => {
  return (
    <NavLink
      to={page === Pages.Home ? '/' : `/${page.toLowerCase()}`}
      className={getLinkClass}
      style={getLinkStyle}
    >
      {page}
    </NavLink>
  );
};
