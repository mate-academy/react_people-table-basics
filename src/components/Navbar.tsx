import { NavLink } from 'react-router-dom';

interface Props {
  isActive: boolean;
}

const getNavLinkClass = ({ isActive }: Props) =>
  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getNavLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
