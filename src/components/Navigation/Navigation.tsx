import { ROUTES } from '../../Variables';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to={ROUTES.home} text="Home" />
          <PageNavLink to={ROUTES.people} text="People" />
        </div>
      </div>
    </nav>
  );
};
