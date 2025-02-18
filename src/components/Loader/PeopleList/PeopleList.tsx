import React from 'react';
import { Person } from '../../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
};

export const PeopleList: React.FC<Props> = ({
  people,
  selectedPerson,
  setSelectedPerson,
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
        {people.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            people={people}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
