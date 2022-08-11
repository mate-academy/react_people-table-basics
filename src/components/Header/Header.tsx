import { NavLink } from 'react-router-dom';

interface Status {
  isActive: boolean,
}

export const Header = () => {
  const getLinkClass = (status: Status) => {
    return status.isActive ? 'nav__link is-active' : 'nav__link';
  };

  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={getLinkClass}
      >
        Home page
      </NavLink>

      <NavLink
        to="/people"
        className={getLinkClass}
      >
        People page
      </NavLink>
    </nav>
  );
};
