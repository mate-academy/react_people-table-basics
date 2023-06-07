import { NavLinkComponent } from './NavLinkComponent';

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
          <NavLinkComponent to="/" content="Home" />
          <NavLinkComponent to="people" content="People" />

        </div>
      </div>
    </nav>
  );
};
