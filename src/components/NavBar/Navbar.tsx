import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

export const Navbar = () => {
  const getLinksClass = ({ isActive }: { isActive: boolean }) =>
    classnames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinksClass}>
            Home
          </NavLink>

          <NavLink to="people" className={getLinksClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
