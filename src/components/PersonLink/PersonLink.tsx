import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | null;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <>{name || '-'}</>;
  }

  return (
    <Link
      to={`../${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
