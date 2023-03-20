import React from 'react';
import { Person } from '../../types';
import { findParents } from '../../utils/findParents';
import { PersonComponent } from '../PersonComponent';

type Props = {
  peopleData: Person[];
  selectedPerson: string;
};

export const PeopleTable: React.FC<Props> = ({
  peopleData,
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
        {peopleData.map((person) => {
          const mother = findParents(peopleData, person.motherName);
          const father = findParents(peopleData, person.fatherName);

          return (
            <PersonComponent
              key={person.slug}
              person={person}
              isSelected={person.slug === selectedPerson}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
