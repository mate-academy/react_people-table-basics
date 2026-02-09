import { Link } from 'react-router-dom';
import type { Person } from '../types/Person';

type Props = {
  person?: Person;
  name?: string;
  people?: Person[];
};

export const PersonLink = ({ person, name, people }: Props) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  const found = people?.find(p => p.name === name);

  if (!found) {
    return name ?? '';
  }

  return (
    <Link
      to={`/people/${found.slug}`}
      className={found.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
