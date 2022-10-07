import { NavigationLink } from './NavigationLink';

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink to="/" linkText="Home" />
        <NavigationLink to="people" linkText="People" />
      </div>
    </div>
  </nav>
);
