import { NavHeaderLink } from './NavHeaderLink';

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
          <NavHeaderLink
            title="Home"
            directTo="/"
          />

          <NavHeaderLink
            title="People"
            directTo="/people"
          />
        </div>
      </div>
    </nav>
  );
};
