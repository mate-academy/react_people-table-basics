import { NavLink } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
};

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink to="/" end className={getLinkClassName}>
          Home
        </NavLink>

        <NavLink to="/people" className={getLinkClassName}>
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
