import React from 'react';
import { Person } from '../../types/Person';

interface Props {
  person: Person | undefined;
  name: string;
}

export const PersonLink = ({ person, name }: Props) => {
  if (!person) {
    return <span>{name}</span>;
  }

  const isFemale = person.sex === 'f';

  return (
    <a
      href={`#/people/${person.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {name}
    </a>
  );
};
