import { Link } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

type Props = {
  person: string | Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return '-';
  }

  if (typeof person === 'string') {
    return person;
  }

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={person.slug}
    >
      {person.name}
    </Link>
  );
};
