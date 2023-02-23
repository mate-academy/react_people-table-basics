import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  linkText: string;
};

type LinkState = {
  isActive: boolean;
};

type GetNavItemClassesFunc = (linkState: LinkState) => string;

export const PageNavLink: React.FC<Props> = ({ to, linkText }) => {
  const getClasses: GetNavItemClassesFunc = ({ isActive }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <NavLink
      to={to}
      className={getClasses}
    >
      {linkText}
    </NavLink>
  );
};
