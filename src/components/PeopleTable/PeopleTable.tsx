import React from 'react';
import { Person } from '../../types';
import { Persona } from '../Persona/Persona';

type Props = {
  people: Person [];
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({ people }) => (
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
          <Persona
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  ),
);
