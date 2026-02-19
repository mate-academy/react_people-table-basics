import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => (
  <nav className="navbar mb-4" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/people"
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
