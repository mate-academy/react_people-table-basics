import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={`${isFemale ? 'has-text-danger' : ''}`}
    >
      {name}
    </Link>
  );
};
