import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';

interface Props {
  to: string;
  text: string;
}

export const PageNavLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={`${to}`}
    >
      {text}
    </NavLink>
  );
};
