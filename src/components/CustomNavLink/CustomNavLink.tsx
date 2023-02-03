import React, { memo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string,
  title: string
}

export const CustomNavLink: React.FC<Props> = memo((props) => {
  const {
    to,
    title,
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  );
});
