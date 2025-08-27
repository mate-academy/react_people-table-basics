import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
  person?: Person;
  name: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <>-</>;
  }

  if (person) {
    return (
      <Link
        to={person ? `/people/${person.slug}` : '#'}
        className={person?.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    );
  }

  return <>{name}</>;
};
