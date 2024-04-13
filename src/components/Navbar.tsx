import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const isActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: FC = () => {
  return (
    <div className="navbar-brand">
      <NavLink className={isActiveClass} to="/">
        Home
      </NavLink>

      <NavLink to="/people" className={isActiveClass}>
        People
      </NavLink>
    </div>
  );
};
