import { Link } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person | null;
  fallback?: string;
};

export const PersonLink = ({ person, fallback = '' }: Props) => {
  if (!person) {
    return <>{fallback}</>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : undefined;

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
