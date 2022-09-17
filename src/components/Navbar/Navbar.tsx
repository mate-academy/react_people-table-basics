import { NavbarPage } from '../NavbarPage/NavbarPage';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavbarPage to="/" text="Home" />
          <NavbarPage to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
