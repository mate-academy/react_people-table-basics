import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  person: Person | string | null;
  people?: Person[];
}

export const PersonLink = ({ person, people }: PersonLinkProps) => {
  if (!person) {
    return <span>-</span>;
  }

  const personObj: Person | undefined =
    typeof person === 'string' ? people?.find(p => p.name === person) : person;

  if (!personObj) {
    return <span>{typeof person === 'string' ? person : person.name}</span>;
  }

  return (
    <Link
      to={`/people/${personObj.slug}`}
      className={personObj.sex === 'f' ? 'has-text-danger' : ''}
    >
      {personObj.name}
    </Link>
  );
};
