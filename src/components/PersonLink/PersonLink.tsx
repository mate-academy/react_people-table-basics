import { Link } from 'react-router-dom';
import { Person } from '../../types';

export const PersonLink = ({
  name,
  people,
}: {
  name: string;
  people: Person[];
}) => {
  const person = people.find(p => p.name === name);

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
      {person.name}
    </Link>
  );
};
