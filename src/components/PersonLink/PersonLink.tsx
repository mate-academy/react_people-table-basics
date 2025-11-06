import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(pers => pers.name === name);

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
