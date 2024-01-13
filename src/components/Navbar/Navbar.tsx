import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const handleIsActive = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Navbar = () => {
  return (
    <div className="navbar-brand">
      <NavLink
        className={handleIsActive}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={handleIsActive}
        to="/people"
      >
        People
      </NavLink>
    </div>
  );
};
