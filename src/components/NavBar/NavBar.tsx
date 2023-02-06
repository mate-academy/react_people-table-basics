import { FC, memo } from 'react';
import { PageNavigation } from '../PageNavigation/PageNavigation';

export const NavBar: FC = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavigation to="/" text="Home" />
        <PageNavigation to="/people" text="People" />
      </div>
    </div>
  </nav>
));
