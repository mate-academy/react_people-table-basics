import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const setIsActive = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Nav: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={setIsActive} to="/">
            Home
          </NavLink>

          <NavLink className={setIsActive} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
