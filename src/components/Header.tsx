import { FC, memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

type Active = {
  isActive: boolean
};

export const Header: FC = memo(() => {
  const navLinkClass = ({ isActive }: Active) => (
    isActive ? 'navbar-item is-tab is-active' : 'navbar-item is-tab'
  );

  return (
    <header>
      <nav
        className="navbar"
      >
        <div className="navbar-brand">
          <NavLink to="/" className={navLinkClass}>Home page</NavLink>
          <NavLink to="/people" className={navLinkClass}>People</NavLink>
        </div>
      </nav>
      <Outlet />
    </header>
  );
});
