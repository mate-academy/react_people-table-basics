import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  name?: string | null;
  person?: Person;
};

export const PersonLink = ({ person, name }: Props) => {
  const displayName = person?.name || name;

  if (!displayName) {
    return <>-</>;
  }

  if (!person) {
    return <>{displayName}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {displayName}
    </Link>
  );
};
