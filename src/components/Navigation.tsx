import { PageNavLink } from "./PageNavLink";

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to={'/'} text={'Home'} end={true} />
        <PageNavLink to={'people'} text={'People'} end={false} />
      </div>
    </div>
  </nav>
);
