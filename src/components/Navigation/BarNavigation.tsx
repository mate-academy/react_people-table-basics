import { FC } from 'react';
import { PageNavigation } from './PageNavigation';

export const BarNavigation: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavigation to="/" content="Home" />

          <PageNavigation to="/people" content="People" />
        </div>
      </div>
    </nav>
  );
};
