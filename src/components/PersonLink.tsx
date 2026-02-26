import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </NavLink>
);
