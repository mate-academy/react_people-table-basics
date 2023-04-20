import { NavLinkItem } from './NavLinkItem';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLinkItem title="Home" to="/" />
        <NavLinkItem title="People" to="people" />
      </div>
    </div>
  </nav>
);
