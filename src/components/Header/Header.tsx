import { NavLinkComponent } from '../NavLinkComponent';

export const Header: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLinkComponent title="Home" to="/" />
        <NavLinkComponent title="People" to="/people" />
      </div>
    </div>
  </nav>
);
