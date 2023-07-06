import React from 'react';
import { TableItem } from '../TableItem';
import { Person } from '../../types';

interface Props {
  persons: Person[],
}

export const TableList: React.FC<Props> = ({ persons }) => (
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
      {persons.map(person => (
        <TableItem
          key={person.slug}
          person={person}
        />
      ))}
    </tbody>
  </table>
);
