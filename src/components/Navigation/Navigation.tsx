import { PageNavLink } from '../PageNavLink';

export const Navigation: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" text="Home" end />
          <PageNavLink to="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
