import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';

export const Navbar = () => (
  <nav
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
    data-cy="nav"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" end data-cy="navHome" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/people" data-cy="navPeople" className={getNavLinkClass}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
