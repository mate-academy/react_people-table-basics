import { Link } from 'react-router-dom';
import type { Person } from '../types/Person';

export const PersonLink = ({ person }: { person: Person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);
