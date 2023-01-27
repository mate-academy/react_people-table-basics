import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation: FC = () => {
  return (
    <div className="navbar-brand">
      <NavLink
        className={({ isActive }) => cn('navbar-item',
          { 'has-background-grey-lighter': isActive })}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) => cn('navbar-item',
          { 'has-background-grey-lighter': isActive })}
        to="/people"
      >
        People
      </NavLink>
    </div>
  );
};
