import { NavBarLink } from './NavBarLink';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavBarLink title="Home" redirectTo="/" />
        <NavBarLink title="People" redirectTo="/people" />
      </div>
    </div>
  </nav>
);
