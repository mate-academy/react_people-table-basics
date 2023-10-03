import React from 'react';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { TABLE_COLUMNS } from '../../utils/constants';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_COLUMNS.map(column => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
