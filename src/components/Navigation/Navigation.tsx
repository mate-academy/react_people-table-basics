import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../Utiles/PATHS';


const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  



export const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to={`${PATHS.home}`}>
            Home
          </NavLink>

          <NavLink className={getLinkClass} to={`${PATHS.people}`}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};