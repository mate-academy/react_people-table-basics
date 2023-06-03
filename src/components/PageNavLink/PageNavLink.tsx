import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type PageNavLinkProps = {
  to:string;
  text:string;
};

export const PageNavLink: React.FC<PageNavLinkProps> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {text}
    </NavLink>
  );
};
