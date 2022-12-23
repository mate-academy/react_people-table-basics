import { NavItem } from './NavItem';

export const NavBar: React.FC = (
) => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavItem path="/" text="Home" />
        <NavItem path="/people" text="People" />
      </div>
    </div>
  </nav>
);
