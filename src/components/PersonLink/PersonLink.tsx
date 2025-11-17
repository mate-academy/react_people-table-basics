import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  person?: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  if (!person) return null;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
