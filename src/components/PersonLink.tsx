import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person | undefined;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  const isFemale = person.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
