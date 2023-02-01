import React, { memo } from 'react';
import { Person } from '../../types';
import { PeopleTableBody } from '../PeopleTableBody/PeopleTableBody';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = memo(({ people }) => (
  people.length === 0
    ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    )
    : (
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

        {people.map(person => (
          <PeopleTableBody
            key={person.slug}
            person={person}
          />
        ))}
      </table>
    )
));
