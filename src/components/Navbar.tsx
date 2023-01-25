import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';

type NavigationItem = {
  link: string,
  name: string,
};

type Props = {
  navItems: NavigationItem[]
};

export const Navbar: FC<Props> = ({ navItems }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navItems.map(item => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
