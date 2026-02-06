import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  personName: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return <>-</>;
  }

  const foundPerson = people.find(p => p.name === personName);

  if (!foundPerson) {
    return <>{personName}</>;
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
