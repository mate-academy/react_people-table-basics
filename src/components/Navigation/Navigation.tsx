import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = () => {
  const handlerActiveLink = (isActive: boolean) => {
    return cn('navbar-item', {
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
          <NavLink
            to="/"
            className={({ isActive }) => handlerActiveLink(isActive)}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={({ isActive }) => handlerActiveLink(isActive)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
