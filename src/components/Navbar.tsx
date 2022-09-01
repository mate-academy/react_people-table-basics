import { HeaderNavLink } from './HeaderNavLink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <HeaderNavLink
          to="/"
          text="Home"
        />

        <HeaderNavLink
          to="/people"
          text="People"
        />
      </div>
    </div>
  </nav>

);
