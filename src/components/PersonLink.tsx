import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const foundPerson = people.find(person => person.name === name);

  if (!foundPerson) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {foundPerson.name}
    </Link>
  );
};
