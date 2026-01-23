import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (person === null) {
    return '-';
  }

  return person?.slug ? (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  ) : (
    <span>{person?.name}</span>
  );
};
