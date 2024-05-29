import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Navigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkClass} to="/people">
          People
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
