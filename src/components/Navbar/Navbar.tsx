import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item${isActive ? ' has-background-grey-lighter' : ''}`;

  return (
    <nav className="navbar-brand" aria-label="Main navigation">
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>

      <NavLink to="/people" className={getNavLinkClass}>
        People
      </NavLink>
    </nav>
  );
};
