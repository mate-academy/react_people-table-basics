import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
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
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/people" className={getLinkClass}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
