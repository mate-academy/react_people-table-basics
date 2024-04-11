import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const handleStyleChange = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const NavMenu = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={handleStyleChange} to="/">
          Home
        </NavLink>

        <NavLink className={handleStyleChange} to="/people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
