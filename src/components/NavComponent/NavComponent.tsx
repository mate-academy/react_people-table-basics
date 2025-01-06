import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const NavComponent = () => {
  const isHasActiveClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isHasActiveClass} to="/">
            Home
          </NavLink>

          <NavLink className={isHasActiveClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
