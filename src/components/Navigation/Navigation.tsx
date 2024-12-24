import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = () => {
  const getActive = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getActive} to="..">
          Home
        </NavLink>

        <NavLink className={getActive} to="people">
          People
        </NavLink>
      </div>
    </div>
  );
};
