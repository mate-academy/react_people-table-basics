import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { LinkStatus } from '../../types/LinkStatus';

function getLinkClass({ isActive, isPending }: LinkStatus) {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
    'has-background-white-ter': isPending,
  });
}

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
