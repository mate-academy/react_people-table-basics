import { NavLink } from 'react-router-dom';
import cn from 'classnames';

enum LinkOptions {
  HOME = 'Home',
  PEOPLE = 'People',
}

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {Object.values(LinkOptions).map(link => (
            <NavLink
              key={link}
              className={getLinkClass}
              to={link === 'Home' ? '..' : `${link.toLowerCase()}`}
            >
              {link}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
