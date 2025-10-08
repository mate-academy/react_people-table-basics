import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person?: Person | null;
  name?: string;
};

export const PersonLink = ({ person, name }: Props) => {
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

  if (name) {
    return <span>{name}</span>;
  }

  return <>-</>;
};
