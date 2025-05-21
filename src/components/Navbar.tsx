import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type NavLinkProps = {
  isActive: boolean;
};

const Navbar = () => {
  const getNavLinkClass = ({ isActive }: NavLinkProps) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getNavLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
