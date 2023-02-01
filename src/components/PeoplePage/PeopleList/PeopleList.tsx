import React, { memo } from 'react';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { Person } from '../../../types';

interface Props {
  people: Person[];
  selectedPerson: string | null;
}

export const PeopleList: React.FC<Props> = memo(({
  people,
  selectedPerson,
}) => {
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
        {people.length !== 0
          ? (
            people.map(person => (
              <PersonInfo
                person={person}
                selectedPerson={selectedPerson}
                key={person.slug}
              />
            ))
          ) : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
      </tbody>
    </table>
  );
});
