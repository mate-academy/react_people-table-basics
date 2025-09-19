import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';

  return (
    <Link
      className={isWoman ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
