import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar = () => {
  const location = useLocation();
  // Keep People page filters when moving between /people and /people/:slug.
  const peopleSearch = location.pathname.startsWith('/people')
    ? location.search
    : '';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" end className={getNavLinkClassName}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: peopleSearch,
            }}
            className={getNavLinkClassName}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
