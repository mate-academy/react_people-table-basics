import { PageNavLink } from '../PageNavLink';

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" linkText="Home" />
          <PageNavLink to="people" linkText="People" />
        </div>
      </div>
    </nav>
  );
};
