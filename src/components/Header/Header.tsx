import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className="has-text-centered">
      <NavLink
        className={({ isActive }) => (
          isActive ? 'has-text-primary' : ''
        )}
        to="/"
      >
        Home
      </NavLink>
      {' '}
      <NavLink
        className={({ isActive }) => (
          isActive ? 'has-text-primary' : ''
        )}
        to="/people"
      >
        People
      </NavLink>
    </nav>
  );
};
