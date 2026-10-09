import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person | null;
  name?: string;
};

export const PersonLink = ({ person, name }: Props) => {
  if (!person) {
    return <>{name || '-'}</>;
  }

  const colorClass = person.sex === 'f' ? 'has-text-danger' : 'has-text-link';

  return (
    <Link to={`/people/${person.slug}`} className={colorClass}>
      {person.name}
    </Link>
  );
};
