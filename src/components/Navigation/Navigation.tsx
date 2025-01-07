import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

const NavigationLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink className={navLinkClasses} to={to}>
    {children}
  </NavLink>
);

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
          <NavigationLink to="/">Home</NavigationLink>
          <NavigationLink to="people">People</NavigationLink>
        </div>
      </div>
    </nav>
  );
};
