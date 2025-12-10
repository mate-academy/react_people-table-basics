import React from 'react';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const classPerson = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <a href={`#/people/${person.slug}`} className={classPerson}>
      {person.name}
    </a>
  );
};
