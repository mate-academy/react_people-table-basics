import React from 'react';
import { Person } from '../../types/Person';
import { Link } from 'react-router-dom';

type Props = {
  person: Person | null;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <>-</>;
  }

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
