import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  fallbackName?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  if (!fallbackName) {
    return <>-</>;
  }

  if (!person) {
    return <>{fallbackName}</>;
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
