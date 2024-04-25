import { NavLink } from "react-router-dom";
import classNames from "classnames";

const getActiveClass = ({ isActive }: {isActive: boolean}) => classNames('navbar-item',
{ 'has-background-grey-lighter': isActive });

export const Header = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getActiveClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getActiveClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

  );
};
