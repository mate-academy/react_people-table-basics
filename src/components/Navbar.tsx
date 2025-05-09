import { NavLink } from 'react-router-dom';

const activeClassName = ({ isActive }: { isActive: boolean }) =>
  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={activeClassName} to="/">
          Home
        </NavLink>

        <NavLink className={activeClassName} to="/people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
