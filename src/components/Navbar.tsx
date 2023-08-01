import { NavbarLink } from './NavbarLink';
import { Pages } from '../types/Pages';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavbarLink page={Pages.Home} />

        <NavbarLink page={Pages.People} />
      </div>
    </div>
  </nav>
);
