import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {/* <a className="navbar-item" href="#/">
          Home
        </a> */}
        <NavLink
          // className="navbar-item has-background-grey-lighter"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          // className="navbar-item has-background-grey-lighter"
          className={({ isActive }) => classNames('navbar-item',
            { 'has-background-grey-lighter': isActive })}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
