import React from 'react';
import { Link } from 'react-router-dom';

interface Person {
  slug: string;
  name: string;
  sex: string;
}

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => (
  <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
    {person.slug ? (
      <Link to={`/people/${person.slug}`}>{person.name}</Link>
    ) : (
      person.name
    )}
  </span>
);
