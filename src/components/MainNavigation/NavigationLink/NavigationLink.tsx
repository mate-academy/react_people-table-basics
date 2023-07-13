import { FC } from "react";
import { NavLink, To } from "react-router-dom";
import cn from 'classnames';

type Props = {
  title: string;
  to: To;
};

export const NavigationLink: FC<Props> = ({ title, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (cn('navbar-item',
      { 'has-background-grey-lighter': isActive}
    ))}
  >
    {title}
  </NavLink>
);
