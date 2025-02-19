import { Link } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
