import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const findParent = (name: string | null) => {
    return people.find((person) => person.name === name) || null;
  }

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
        {people.map((person) => {
          const mother = findParent(person.motherName);
          const father = findParent(person.fatherName);

          return (
            <PersonLink
              person={person}
              key={person.slug}
              selectedPerson={selectedPerson}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
