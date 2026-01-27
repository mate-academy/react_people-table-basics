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

  const findPerson = people.find(person => person.name === name);

  if (findPerson) {
    return (
      <Link
        to={`/people/${findPerson.slug}`}
        className={findPerson.sex === 'f' ? 'has-text-danger' : undefined}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
