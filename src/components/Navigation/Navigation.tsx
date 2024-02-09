import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const isActiveNavLink
  = ({ isActive }: { isActive: boolean }) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveNavLink} to="/">
            Home
          </NavLink>

          <NavLink
            className={isActiveNavLink}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
