import { PageNavLink } from '../PageNavLink/PageNavLink';

export const Navigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" title="Home" />
        <PageNavLink to="people" title="People" />
      </div>
    </div>
  </nav>
);
