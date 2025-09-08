import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person?: Person;
  name: string;
}

export const PersonLink = ({ person, name }: Props) => {
  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
