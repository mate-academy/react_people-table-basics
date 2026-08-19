import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person?: Person;
  name?: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <span>{name?.trim() || '-'}</span>;
  }

  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
