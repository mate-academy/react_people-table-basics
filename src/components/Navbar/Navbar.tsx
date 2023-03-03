import { NavLinkPage } from '../NavLinkPage';

export const Navbar = () => {
  return (
    <div className="navbar-brand">
      <NavLinkPage link="/" title="Home" />
      <NavLinkPage link="/people" title="People" />
    </div>
  );
};
