import React from 'react';
import { Person } from '../../types/Person';
import { Link } from 'react-router-dom';

interface Props {
  person: Person | null | undefined;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  if (!person) {
    return <>-</>;
  }

  const personInData = people.find(p => p.name === person.name);

  if (!personInData) {
    return <>{person.name}</>;
  }

  const isFemale = personInData.sex === 'f';

  return (
    <Link
      to={`/people/${personInData.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
