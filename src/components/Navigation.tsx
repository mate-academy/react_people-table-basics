import { PageNavLink } from '../pages/PageNavLink';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" text="Home" end />
        <PageNavLink to="people" text="People" end={false} />
      </div>
    </div>
  </nav>
);
