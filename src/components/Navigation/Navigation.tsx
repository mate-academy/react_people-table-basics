import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useAppContext } from '../context/AppContext';

const getClassLink = ({ isActive }: { isActive: boolean }) => {
  return (
    cn('navbar-item', { 'has-background-grey-lighter': isActive })
  );
};

export const Navigation = () => {
  const { setHasClickedPeopleLink } = useAppContext();

  const handlePeopleClick = () => {
    setHasClickedPeopleLink(true);
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
            to="/"
            className={getClassLink}
          >
            Home
          </NavLink>

          <NavLink
            onClick={handlePeopleClick}
            to="/people"
            className={getClassLink}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
