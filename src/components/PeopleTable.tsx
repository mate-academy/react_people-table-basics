import React from 'react';
import { Person as PersonType } from '../types';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
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
        {people.map((person) => (
          <Person key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
