import { FC } from 'react';
import { NavBarLink } from '../NavBarLink';

export const NavBar: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavBarLink
            to="/"
            text="Home"
          />

          <NavBarLink
            to="people"
            text="People"
          />
        </div>
      </div>
    </nav>
  );
};
