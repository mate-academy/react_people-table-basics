import { NavElement } from '../NavButton';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavElement>Home</NavElement>
        <NavElement>People</NavElement>
        <NavElement>No page</NavElement>
      </div>
    </div>
  </nav>
);
