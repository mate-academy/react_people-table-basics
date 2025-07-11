import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type PersonLinkProps = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return person.slug ? (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy="personNameLink"
    >
      {person.name}
    </Link>
  ) : (
    <span>{person.name}</span>
  );
};
