import { NavItem } from '../NavItem';

export const Nav = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavItem path="/" title="Home" />
          <NavItem path="/people" title="People" />
        </div>
      </div>
    </nav>
  );
};
