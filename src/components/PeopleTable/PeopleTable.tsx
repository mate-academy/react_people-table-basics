import React from 'react';
import { TableRow } from '../TableRow';
import { TableHeaders } from '../TableHeaders';
import { Person } from '../../types/Person';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <TableHeaders />
    </thead>

    <tbody>
      {people.map(person => (
        <TableRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
