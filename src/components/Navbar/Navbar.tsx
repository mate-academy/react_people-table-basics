import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  clickedNavs: string;
  handleNavClick: (value: string) => void;
}

export const Navbar: React.FC<Props> = ({ clickedNavs, handleNavClick }) => {
  const [isNavigationClicked, setIsNavigationClicked] = useState(false);

  useEffect(() => {
    setIsNavigationClicked(clickedNavs.includes('/people'));
  }, [clickedNavs]);

  const handleNavLinkClick = () => {
    setIsNavigationClicked(true);
    handleNavClick('/people');
  };

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
            className={`navbar-item ${!isNavigationClicked && 'has-background-grey-lighter'}`}
            exact
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={`navbar-item ${isNavigationClicked && 'has-background-grey-lighter'}`}
            to="/people"
            onClick={handleNavLinkClick}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
