import React from 'react';
import { Person } from '../../types';
import { PersonData } from '../PersonData';

type Props = {
  people: Person[];
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
            <PersonData
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
