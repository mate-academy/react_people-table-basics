import {FC} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

export const Navigation: FC = () => (
  <div className="navbar-brand">
    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to="/"
    >
      Home
    </NavLink>

    <NavLink
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to="/people"
    >
      People
    </NavLink>
  </div>
);
