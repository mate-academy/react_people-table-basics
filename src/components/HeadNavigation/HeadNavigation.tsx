import { NavLink } from 'react-router-dom';

export const HeadNavigation: React.FC = () => {
  return (
    <header>
      <h1>People Table</h1>
      <nav>
        <NavLink
          to="/"
          className="nav__link"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className="nav__link"
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
