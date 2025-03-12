/* eslint-disable @typescript-eslint/indent */
import { Person } from '../../types';
import { NavLink } from 'react-router-dom';

const PersonLink = ({ person }: { person: Person }) => (
  <NavLink
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </NavLink>
);

export default PersonLink;
