import React from 'react';
import { PeopleTableRow } from '../PeopleTableRow';
import { Person } from '../../types';
import { TableRowLabel } from '../../types/TableRowLabel';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {Object.values(TableRowLabel).map(label => (
          <th>{label}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PeopleTableRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
