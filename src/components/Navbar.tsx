import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const getNavLinksClass = ({ isActive }: { isActive: boolean }) =>
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
          <NavLink to="/" className={getNavLinksClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getNavLinksClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
