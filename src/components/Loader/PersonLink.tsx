import { Link } from 'react-router-dom';

import { Person } from '../../types';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink = ({ name, people }: Props) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(item => item.name === name);

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
