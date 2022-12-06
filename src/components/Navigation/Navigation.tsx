import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  selectedLinkHandler: (navPage: string) => void
  resetPeopleFromServer: () => void
};

export const Navigation: React.FC<Props> = ({
  selectedLinkHandler,
  resetPeopleFromServer,
}) => {
  const navigationHome = () => {
    selectedLinkHandler('Home');
    resetPeopleFromServer();
  };

  const navigationPeople = () => {
    selectedLinkHandler('People');
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
            className={({ isActive }) => classnames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/"
            onClick={navigationHome}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => classnames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/people"
            onClick={navigationPeople}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
