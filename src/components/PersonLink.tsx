import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type PersonLinkProps = {
  name: string;
  people: Person[];
};

export const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const findPerson = people.find(person => person.name === name);

  if (!findPerson) {
    return <span>{name}</span>;
  }

  const isPersonWoman = findPerson.sex === 'f';

  return (
    <Link
      to={`/people/${findPerson?.slug}`}
      className={isPersonWoman ? 'has-text-danger' : ''}
    >
      {findPerson.name}
    </Link>
  );
};
