import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  clickedNavs: string;
  handleNavClick: (value: string) => void;
}

export const Navbar: React.FC<Props> = ({ clickedNavs }) => {
  const [clickedNav, setClickedNav] = useState(clickedNavs);

  useEffect(() => {
    setClickedNav(clickedNavs);
  }, [clickedNavs]);

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={`navbar-item ${clickedNav === '/' && 'has-background-grey-lighter'}`}
            exact
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={`navbar-item ${clickedNav === '/people' && 'has-background-grey-lighter'}`}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
