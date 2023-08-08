import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const Navigation = () => (
  <div className="navbar-brand">
    <NavLink to="/" className={getLinkClass}>
      Home
    </NavLink>

    <NavLink to="/people" className={getLinkClass}>
      People
    </NavLink>
  </div>
);
