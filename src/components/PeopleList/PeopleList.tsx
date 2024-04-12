import React from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleItem';

type Props = {
  people: Person[];
  personId: string;
  getFather: (name: string | null) => Person | undefined;
  getMother: (name: string | null) => Person | undefined;
};
const COLUMN_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleList: React.FC<Props> = ({
  people,
  personId,
  getFather,
  getMother,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {COLUMN_HEADERS.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PeopleTable
          person={person}
          personId={personId}
          key={person.slug}
          getFather={getFather}
          getMother={getMother}
        />
      ))}
    </tbody>
  </table>
);
