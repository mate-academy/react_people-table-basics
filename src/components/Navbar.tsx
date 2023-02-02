import { TemplateNavLink } from './TemplateNavLink';

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
          <TemplateNavLink to="/" textToDisplay="Home" />
          <TemplateNavLink to="/people" textToDisplay="People" />
        </div>
      </div>
    </nav>
  );
};
