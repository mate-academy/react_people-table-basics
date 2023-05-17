import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
}

export const Navbar: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};
