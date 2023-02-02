import { FC } from 'react';
import { NavLink, To } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  to: To;
  title: string;
}

export const CustomNavLink: FC<Props> = ({ to, title }) => (
  <NavLink
    to={to}
    className={({ isActive }) => {
      return classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      });
    }}
  >
    {title}
  </NavLink>
);
