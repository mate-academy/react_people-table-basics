import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'is-info' : 'is-light';
  };

  return (
    <nav className="buttons m-5">
      <NavLink
        to="/"
        className={(param) => classNames('button', getLinkClass(param))}
      >
        Home
      </NavLink>
      <NavLink
        to="/people"
        className={(param) => classNames('button', getLinkClass(param))}
      >
        People
      </NavLink>
    </nav>
  );
};
