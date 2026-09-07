import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';

const getLinkClass = ({ isActive }: NavLinkRenderProps) =>
  cn('navbar-item', isActive && 'has-background-grey-lighter');

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClass} to="/" end>
          Home
        </NavLink>

        <NavLink className={getLinkClass} to="/people">
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
