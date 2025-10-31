import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  person: Person | null | undefined;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return null;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
    >
      {person.name}
    </Link>
  );
};
