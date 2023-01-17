import { PageNavLink } from './PageNavLink';

export const Navbar = () => (
  <div className="navbar-brand">
    <PageNavLink to="/" text="Home" />
    <PageNavLink to="people" text="People" />
  </div>
);
