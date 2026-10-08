import { Link } from 'react-router-dom';

import { Person } from '../types';

type Props = {
  person: Person | null;
  fallbackName?: string;
};

export const PersonLink = ({ person, fallbackName }: Props) => {
  if (!person) {
    return <>{fallbackName ?? null}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </Link>
  );
};
