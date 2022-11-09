import React from 'react';
import { PersonLink } from '../PersonLink';

import { Person } from '../../types';

type Props = {
  people: Person[];
  selectedPerson: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
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
          <PersonLink
            key={person.slug}
            person={person}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
