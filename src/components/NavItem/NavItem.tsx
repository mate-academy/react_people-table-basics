import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export type LinkProps = {
  path: string;
  title: string;
};

export const NavItem: FC<LinkProps> = ({ path, title }) => {
  return (
    <NavLink
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
      to={path}
    >
      {title}
    </NavLink>
  );
};
