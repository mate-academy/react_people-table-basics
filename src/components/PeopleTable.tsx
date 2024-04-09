import React from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          const { motherName, fatherName, slug } = person;

          const mother = motherName
            ? people.find(character => character.name === motherName)?.slug
            : undefined;

          const father = fatherName
            ? people.find(character => character.name === fatherName)?.slug
            : undefined;

          return (
            <PersonInfo
              person={person}
              mother={mother}
              father={father}
              key={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
