import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const slugExists = people.some(p => p.slug === person.slug);

  if (!slugExists) {
    return (
      <span className={person.sex === 'f' ? 'has-text-danger' : undefined}>
        {person.name}
      </span>
    );
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </Link>
  );
};
