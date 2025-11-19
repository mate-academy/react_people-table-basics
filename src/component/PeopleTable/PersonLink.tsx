import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Prop {
  person: Person;
}

export const PersonLink: React.FC<Prop> = ({ person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
