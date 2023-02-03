import { FC } from 'react';
import { NavLink, To } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: To;
  textToDisplay: string;
};

export const TemplateNavLink: FC<Props> = ({ to, textToDisplay }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {textToDisplay}
  </NavLink>
);
