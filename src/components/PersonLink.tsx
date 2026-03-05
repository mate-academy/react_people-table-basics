import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person?: Person | null;
  name?: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <span>{name || '-'}</span>;
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
