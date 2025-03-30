import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

enum Links {
  Home,
  People,
}

const getLinkClassName = ({ isActive }: { isActive: boolean }): string => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {Object.values(Links).map(link => {
            if (typeof link === 'number') {
              return;
            }

            const linkText = link === 'Home' ? '' : link.toLowerCase();

            return (
              <NavLink
                key={link}
                to={`/${linkText}`}
                className={getLinkClassName}
              >
                {link}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
