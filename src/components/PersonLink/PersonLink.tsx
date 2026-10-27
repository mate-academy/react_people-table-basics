import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : undefined}
  >
    {person.name}
  </Link>
);
