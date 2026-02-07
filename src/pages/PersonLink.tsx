import React, { FC } from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
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
