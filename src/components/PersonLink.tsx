import { Link } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person | null;
  name?: string | null;
};

export const PersonLink = ({ person, name }: Props) => {
  const personName = person?.name || name;

  if (!personName) {
    return <>-</>;
  }

  if (!person) {
    return <>{personName}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
