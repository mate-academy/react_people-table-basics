import React from 'react';
import { TableRow } from '../TableRow';
import { TableHeaders } from '../TableHeaders';
import { Person } from '../../types/Person';

const tableHeaders = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <TableHeaders headers={tableHeaders} />
    </thead>

    <tbody>
      {people.map(person => (
        <TableRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
