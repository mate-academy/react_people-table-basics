import { Link } from 'react-router-dom';

import type { Person } from '../../types';

type Props = {
  person: Person;
};

export function PersonLink({ person }: Props) {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </Link>
  );
}
