import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const navLinks = { Home: '/', People: '/People' };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {Object.entries(navLinks).map(([key, value]) => (
            <NavLink
              key={key}
              to={value}
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              {key}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
