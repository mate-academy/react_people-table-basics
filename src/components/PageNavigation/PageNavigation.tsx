import { NavLink } from "react-router-dom";

const getLinkClass = (isActive: boolean) => {
  return `navbar-item ${isActive && 'has-background-grey-lighter'}`;
};

export const PageNavigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={({ isActive }) => getLinkClass(isActive)} to="/">
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => getLinkClass(isActive)}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
