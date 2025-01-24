import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person | null;
}

export const PersonLink = ({ person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      data-cy="personLink"
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
