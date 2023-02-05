import { FC } from 'react';
import { CustomNavLink } from './CustomNavLink';

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
          <CustomNavLink to="/" text="Home" />

          <CustomNavLink to="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
