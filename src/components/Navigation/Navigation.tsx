import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface NavLinkClassName {
  isActive: boolean;
}

export const Navigation: React.FC = () => {
  const getClasses = ({ isActive }: NavLinkClassName) => classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getClasses}>
            Home
          </NavLink>

          <NavLink to="/people" className={getClasses}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
