import { Person } from '../types';
import { Link } from 'react-router-dom';

export const PersonLink = ({ person }: { person: Person }) => (
  <Link
    className={person.sex === 'f' ? 'has-text-danger' : ''}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);
