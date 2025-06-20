import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

export const userVerification = (list: Person[], location: string) => {
  if (list === null) return false;
  return list.some(person => location.endsWith(person.slug));
}

export const Nav = () => {
  const location = useLocation().pathname;

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.endsWith('/'),
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': location.startsWith('/people'),
            })}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
