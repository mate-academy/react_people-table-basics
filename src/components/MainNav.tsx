import { NavPageLink } from './NavPageLink';

export const MainNav = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavPageLink to="/" text="Home" />
          <NavPageLink to="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
