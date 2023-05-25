import { NavLinkCustom } from '../NavLinkCustom';

export const Header = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLinkCustom to="/" title="Home" />
        <NavLinkCustom to="/people" title="People" />
      </div>
    </div>
  </nav>
);
