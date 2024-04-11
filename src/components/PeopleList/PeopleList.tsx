import React from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleItem';

type Props = {
  people: Person[];
  personId: string;
};
const COLUMN_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleList: React.FC<Props> = ({ people, personId }) => (
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
          people={people}
          person={person}
          personId={personId}
          key={person.slug}
        />
      ))}
    </tbody>
  </table>
);
