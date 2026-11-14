import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: '/', title: 'Home' },
    { to: '/people', title: 'People' },
  ];

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {links.map(link => {
            const isActive =
              link.to === '/'
                ? pathname === '/'
                : pathname === link.to || pathname.startsWith(`${link.to}/`);

            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
