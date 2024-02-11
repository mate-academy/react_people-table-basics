import React from 'react';

import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const normalizedPeople = people.map(person => {
    return {
      ...person,
      father: people.find(father => father.name === person.fatherName),
      mother: people.find(mother => mother.name === person.motherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {normalizedPeople.map((person) => (
          <PersonInfo person={person} />
        ))}
      </tbody>
    </table>
  );
};
