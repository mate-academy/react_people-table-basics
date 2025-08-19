import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
};

export const PersonLink = ({ person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  if (person.born === 0) {
    return (
      <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
        {person.name}
      </span>
    );
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy="person-link"
    >
      {person.name}
    </Link>
  );
};
