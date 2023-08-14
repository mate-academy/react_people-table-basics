import React from 'react';

import { Person } from '../types';
import { InfoPerson } from './Loader/InfoPerson';

type Props = {
  people: Person[],
};

export const TablePeople: React.FC<Props> = ({ people }) => {
  const findPeople = (name: string | null) => {
    return people.find(person => person.name === name);
  };

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
        {people.map(person => (
          <InfoPerson
            key={person.slug}
            person={person}
            ifPersonPind={findPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
