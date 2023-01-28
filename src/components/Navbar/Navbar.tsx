import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar: FC = memo(() => {
  return (
    <div className="navbar-brand">
      <NavLink
        to="/"
        className={({ isActive }) => cn('navbar-item',
          { 'has-background-grey-lighter': isActive })}
      >
        Home
      </NavLink>

      <NavLink
        to="people"
        className={({ isActive }) => cn('navbar-item',
          { 'has-background-grey-lighter': isActive })}
      >
        People
      </NavLink>
    </div>
  );
});
