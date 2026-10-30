import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
  peoples: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peoples }) => {
  const findPerson = peoples.find(people => people.name === person.name);

  return (
    <>
      {findPerson ? (
        <Link
          to={`/people/${findPerson.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      ) : (
        <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
          {person.name}
        </span>
      )}
    </>
  );
};
