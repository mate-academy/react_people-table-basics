import { AppNavLink } from '../AppNavLink.tsx';

export const NavBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <AppNavLink to="/" text="Home" />
        <AppNavLink to="people" text="People" />
      </div>
    </div>
  </nav>
);
