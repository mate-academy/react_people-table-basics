import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <nav className="navbar is-light mb-4" role="navigation" data-cy="nav">
      <div className="navbar-menu is-active px-3">
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/people" className={getLinkClass}>
          People
        </NavLink>
      </div>
    </nav>
  );
};
