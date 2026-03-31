import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
