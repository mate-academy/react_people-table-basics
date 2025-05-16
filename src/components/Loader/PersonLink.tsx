import React from 'react';
import { Person } from '../../types';

export const PersonLink: React.FC<{ person: Person | null }> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
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
