import React from 'react';

import { ColumnHeaders, Person } from '../../types';
import { PersonItem } from '../PersonItem';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {Object.values(ColumnHeaders).map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonItem key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
