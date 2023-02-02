import * as React from 'react';
import { NavLink, To } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: To;
  title: string;
};
export const CustomNavLink: React.FC<Props> = (props: Props) => {
  const { to, title } = props;

  return (
    <NavLink
      className={({ isActive }) => cn('navbar-item',
        { 'has-background-grey-lighter': isActive })}
      to={to}
    >
      {title}
    </NavLink>
  );
};
