import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { getParent } from '../../helpers/helpers';

type Props = {
  people: Person[];
  selectedPersonSlug: string
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({ people, selectedPersonSlug }) => {
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
            <PersonItem
              key={person.slug}
              person={person}
              selectedPersonSlug={selectedPersonSlug}
              personMother={getParent(people, person.motherName)}
              personFather={getParent(people, person.fatherName)}
            />
          ))}
        </tbody>
      </table>
    );
  },
);
