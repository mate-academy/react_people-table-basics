import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const foundPerson = people.find(p => p.name === name);

  if (!foundPerson) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${foundPerson.slug}`}
      className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {foundPerson.name}
    </Link>
  );
};
