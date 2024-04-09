import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getIsActive = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <div className="navbar-brand">
      <NavLink className={getIsActive} to="/">
        Home
      </NavLink>

      <NavLink className={getIsActive} to="/people">
        People
      </NavLink>
    </div>
  );
};
