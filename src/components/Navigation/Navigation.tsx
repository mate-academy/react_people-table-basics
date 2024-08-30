import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Path } from '../../types';

const getNavStyles = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getNavStyles} to={Path.main}>
          Home
        </NavLink>

        <NavLink className={getNavStyles} to={Path.people}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
