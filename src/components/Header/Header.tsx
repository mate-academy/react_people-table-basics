import { HeaderNavLink } from '../HeaderNavLink/HeaderNavLink';

export const Header: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <HeaderNavLink to="/" text="Home" />

        <HeaderNavLink to="people" text="People" />
      </div>
    </div>
  </nav>
);
