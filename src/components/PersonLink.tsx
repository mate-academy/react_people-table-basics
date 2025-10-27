import React from 'react';
import { Person } from '../types';

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
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  );
};
