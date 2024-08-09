import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const NavBar = () => (
  <>
    <NavLink to="/" className={getNavLinkClassName}>
      Home
    </NavLink>

    <NavLink to="/people" className={getNavLinkClassName}>
      People
    </NavLink>
  </>
);
