import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  const isWomen = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isWomen ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
