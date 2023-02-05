import React from 'react';

import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[];
};

const tableHeaders = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {tableHeaders.map(header => (
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
