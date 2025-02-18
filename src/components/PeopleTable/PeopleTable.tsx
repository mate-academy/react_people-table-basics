import { Person } from '../../types';
import React from 'react';
import { PersonLink } from '../PersonLink';

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
          function findParent(parentName: string) {
            return people.find(p => p.name === parentName) || null;
          }

          const mother = person.motherName
            ? findParent(person.motherName)
            : null;
          const father = person.fatherName
            ? findParent(person.fatherName)
            : null;

          return (
            <PersonLink
              person={person}
              mother={mother}
              father={father}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
