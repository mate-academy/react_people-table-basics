import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  people: Person[];
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ people, name }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

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
