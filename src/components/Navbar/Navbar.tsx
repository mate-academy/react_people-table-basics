import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavlinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavlinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getNavlinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
