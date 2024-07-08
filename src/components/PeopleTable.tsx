import React from 'react';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';

type Props = {
  people: Person[];
};

export const PeopleTable = React.memo(({ people }: Props) => {
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
          <PeopleTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
});

PeopleTable.displayName = 'PeopleTable';
