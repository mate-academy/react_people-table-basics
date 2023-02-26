import React from "react";
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  title: string,
};

export const NavigationElement: React.FC<Props> = ({ to, title }) => (
  <NavLink
    className={({ isActive }) => (
      classNames("navbar-item", { "has-background-grey-lighter" : isActive })
    )}
    to={to}>
    {title}
  </NavLink>
);
