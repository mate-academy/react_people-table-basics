import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const applyClassName = (props: { isActive: boolean }) => {
    return classNames(
      'navbar-item', { 'has-background-grey-lighter': props.isActive },
    );
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
          <NavLink
            to="/"
            className={applyClassName}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={applyClassName}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
