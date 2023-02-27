import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  selectedPerson,
}) => (
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
      {people.map((person) => (
        <PersonLink
          person={person}
          key={person.slug}
          selectedPerson={selectedPerson}
        />
      ))}
    </tbody>
  </table>
));
