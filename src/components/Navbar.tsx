import { NavItem } from './NavItem';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavItem title="Home" link="/" />

        <NavItem title="People" link="/people" />
      </div>
    </div>
  </nav>
);
