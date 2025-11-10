import React from 'react';
import { Person } from '../../types';
import { PersonRaw } from '../PersonRaw/PersonRaw';

interface PoepleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PoepleTableProps> = ({ people }) => {
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
          <PersonRaw key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
