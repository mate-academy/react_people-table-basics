import { PersonType } from '../../types';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import React from 'react';

interface Props {
  person: PersonType;
}

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
