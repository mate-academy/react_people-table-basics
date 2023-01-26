import React, { memo } from 'react';

import { Person } from '../../types/Person';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = memo(({ people }) => (
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
          key={person.slug}
          person={person}
          people={people}
        />
      ))}
    </tbody>
  </table>
));
