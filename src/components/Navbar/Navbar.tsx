import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/people" className={navLinkClasses}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
