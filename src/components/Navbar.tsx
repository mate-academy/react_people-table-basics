import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const Navbar: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn('navbar-item',
        { 'has-background-grey-lighter': isActive })}
    >
      {text}
    </NavLink>
  );
};
