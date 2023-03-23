import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const PageNav: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return classNames(
          'navbar-item',
          { 'has-background-grey-lighter': isActive },
        );
      }}
      to={to}
    >
      {text}
    </NavLink>
  );
};
