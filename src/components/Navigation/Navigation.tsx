import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const Navigation: FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return classNames('navbar-item',
          { 'has-background-grey-lighter': isActive });
      }}
      to={to}
    >
      {title}
    </NavLink>
  );
};
