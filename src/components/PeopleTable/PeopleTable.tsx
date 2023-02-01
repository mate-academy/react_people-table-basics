import React from 'react';
import { Person } from '../../types';
import { PeopleTableRow } from '../PeopleTableRow';
import { tableColumns } from './tableColumns';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(column => (
            <th key={column.id}>{column.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
});
