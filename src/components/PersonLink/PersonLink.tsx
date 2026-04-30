import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person | null;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={e => e.stopPropagation()}
    >
      {person.name}
    </Link>
  );
};
