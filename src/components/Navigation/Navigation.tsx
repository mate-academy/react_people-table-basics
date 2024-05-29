import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const Navigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <div className="navbar-brand">
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/people" className={getLinkClass}>
        People
      </NavLink>
    </div>
  );
};

export default Navigation;
