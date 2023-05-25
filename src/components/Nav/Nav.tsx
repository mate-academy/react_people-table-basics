import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export type LinkProps = {
  path: string;
  title: string;
};

export const NavItem: FC<LinkProps> = ({ path, title }) => {
  return (
    <NavLink
      className={({ isActive }) => (
        classNames({ 'has-background-grey-lighter': isActive }, 'navbar-item')
      )}
      to={path}
    >
      {title}
    </NavLink>
  );
};

export const Nav = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavItem path="/" title="Home" />
          <NavItem path="/people" title="People" />
        </div>
      </div>
    </nav>
  );
};
