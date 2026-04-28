import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  personName: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const person = people.find(p => p.name === personName);

  if (!person) {
    return <span>{personName}</span>;
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
