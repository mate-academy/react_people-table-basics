import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  textLink: string;
};

export const PageNavKink: React.FC<Props> = ({
  to, textLink,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {textLink}
  </NavLink>
);
