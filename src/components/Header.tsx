import { NavLink } from 'react-router-dom';

const addIsActiveClass = (navLinkState: NavLinkState) => {
  const { isActive } = navLinkState;
  const initialClass = 'navbar-item is-tab';

  return isActive ? `${initialClass} is-active` : initialClass;
};

type NavLinkState = {
  isActive: boolean,
};

export const Header = () => (
  <header className="header">
    <nav
      className="navbar header__navbar"
    >
      <div className="navbar-brand">
        <NavLink
          to="/"
          className={addIsActiveClass}
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={addIsActiveClass}
        >
          People
        </NavLink>
      </div>
    </nav>
  </header>
);
