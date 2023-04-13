import { PageNavLink } from '../PageNavLink/PageNavLink';

export const NavigationBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink title="Home" to="/" />
        <PageNavLink title="People" to="/people" />
      </div>
    </div>
  </nav>
);
