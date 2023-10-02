import React from 'react';
import { PersonType } from '../types';
import { COLUMNS_NAMES } from '../utils/constants';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS_NAMES.map(columnName => (
            <th key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
