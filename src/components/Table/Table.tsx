import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

type TableProps = {
  people: Person[];
};

export const Table: React.FC<TableProps> = ({ people }) => {
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
          <PersonItem
            person={person}
            key={person.slug}
          />
        ))}

      </tbody>
    </table>
  );
};
