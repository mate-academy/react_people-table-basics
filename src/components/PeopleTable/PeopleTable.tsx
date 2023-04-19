import React from 'react';

import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
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
      {people.length
        ? (
          people.map(person => (
            <PersonInfo key={person.slug} person={person} />
          ))
        )
        : (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
    </tbody>
  </table>
);
