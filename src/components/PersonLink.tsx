import React from 'react';
import { Person } from '../types';

export type PersonLinkProps = {
  person: string | null;
  allPeople: Person[];
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  allPeople,
}) => {
  if (!person) {
    return <span>-</span>;
  }

  const foundPerson = allPeople.find(p => p.name === person);

  if (!foundPerson) {
    return <span>{person}</span>;
  }

  const isFemale = foundPerson.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  return (
    <a className={className} href={`#/people/${foundPerson.slug}`}>
      {person}
    </a>
  );
};
