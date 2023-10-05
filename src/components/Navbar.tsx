import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Active = {
  isActive: boolean
};

export const Navbar = () => {
  const linkClass = (active: Active) => classNames('navbar-item', {
    'has-background-grey-lighter': active.isActive,
  });

  return (
    <div className="navbar-brand">
      <NavLink
        to="/"
        className={linkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="people"
        className={linkClass}
      >
        People
      </NavLink>
    </div>
  );
};
