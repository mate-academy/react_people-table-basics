import { PageNavLink } from '../../PageNavLink/PageNavLink';

export const Navbar: React.FC = () => (
  <>
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" text="Home Page" />
          <PageNavLink to="/people" text="People Page" />
        </div>
      </div>
    </nav>
  </>
);
