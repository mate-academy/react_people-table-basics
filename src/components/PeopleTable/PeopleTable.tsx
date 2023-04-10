import React from 'react';
import { PersonType } from '../../types';
import { Person } from '../Person';

type Props = {
  people: PersonType[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
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
        {people.map(person => {
          const isMother = people.find(personSearch => {
            return personSearch.name === person.motherName;
          }) || null;

          const isFather = people.find(personSearch => {
            return personSearch.name === person.fatherName;
          }) || null;

          return (
            <Person
              person={person}
              selectedPersonSlug={selectedPersonSlug}
              isMother={isMother}
              isFather={isFather}
            />
          );
        })}
      </tbody>
    </table>
  );
};
