import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string;
  text: string;
};

export const PageNavLink: FC<Props> = ({ link, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={link}
  >
    {text}
  </NavLink>
);
