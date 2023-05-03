import { PageNavLink } from '../PageNavLink/PageNavLink';

export const PageNavigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink url="/" title="Home" />
        <PageNavLink url="people" title="People" />
      </div>
    </div>
  </nav>
);
