import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
};

export const PageNavLink: FC<Props> = ({ text, to }) => {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={to}
    >
      {text}
    </NavLink>
  );
};
