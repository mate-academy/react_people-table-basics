import React, { memo } from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from 'classnames';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: FC<Props> = memo(({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
));
