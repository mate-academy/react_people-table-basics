import { FC } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const PageLink: FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};
