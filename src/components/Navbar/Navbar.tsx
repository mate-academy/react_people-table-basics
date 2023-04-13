import { FC } from 'react';
import { PageNavLink } from '../PageNavLink';
import { PATH } from '../../types';

export const Navbar: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to={PATH.Main} title="Home" />
          <PageNavLink to={PATH.People} title="People" />
        </div>
      </div>
    </nav>
  );
};
