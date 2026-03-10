import { Link } from 'react-router-dom';
import type { Person } from '../../types/Person';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

export default PersonLink;
