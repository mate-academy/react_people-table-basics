import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person | null;
  fallbackName?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  if (!person && !fallbackName) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{fallbackName}</span>;
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
