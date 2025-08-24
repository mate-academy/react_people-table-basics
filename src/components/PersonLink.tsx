import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const isWoman = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isWoman ? 'has-text-danger' : undefined}
    >
      {person.name}
    </Link>
  );
};
