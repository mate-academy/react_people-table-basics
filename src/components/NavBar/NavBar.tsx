import { NavLink } from 'react-router-dom';
import { AppPath } from '../../types/paths';
import classNames from 'classnames';

interface NavLinkProp {
  className: ({ isActive }: { isActive: boolean }) => string;
  to: string;
  text: string;
}

const NavBar = () => {
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  const navLinks: NavLinkProp[] = [
    {
      className: linkClassName,
      to: '/',
      text: 'Home',
    },
    {
      className: linkClassName,
      to: AppPath.People,
      text: 'People',
    },
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
          {navLinks.map(({ className, to, text }) => (
            <NavLink key={to} className={className} to={to}>
              {text}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
