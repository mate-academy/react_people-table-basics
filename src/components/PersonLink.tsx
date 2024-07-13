import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => (
  <Link
    className={person.sex === 'f' ? 'has-text-danger' : ''}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);
