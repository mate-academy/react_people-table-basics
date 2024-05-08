import React from 'react';
import { Person } from '../types';
import { PersonLink } from './personLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const names: string[] = [];

  return (
    <>
      {people.map(person => {
        names.push(person.name);

        return (
          <PersonLink
            key={person.name}
            person={person}
            names={names}
            people={people}
          />
        );
      })}
    </>
  );
};
