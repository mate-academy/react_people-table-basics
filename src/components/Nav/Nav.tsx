import { NavLinkItem } from './NavLinkItem';

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLinkItem to="/" text="Home" />
        <NavLinkItem to="/people" text="People" />
      </div>
    </div>
  </nav>
);
