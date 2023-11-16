import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Navigation = () => {
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) => {
    return cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav className="navbar-brand">
      <NavLink to="/" className={getActiveLinkClass}>
        Home
      </NavLink>

      <NavLink
        to="/people"
        className={({ isActive }) => {
          return cn('navbar-item', {
            'has-background-grey-lighter': isActive,
          });
        }}
      >
        People
      </NavLink>
    </nav>
  );
};

export default Navigation;
