import { NavLink } from 'react-router-dom';
import { Person } from '../types/Person';

export const PersonLink = ({ person }: { person: Person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </NavLink>
);
