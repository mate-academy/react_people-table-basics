import React from 'react';
import { Person } from '../types';
import { findParents } from '../utils/findParents';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents = people.map(person => {
    let mother = undefined;
    let father = undefined;

    if (person.fatherName) {
      father = findParents(people, person.fatherName);
    }

    if (person.motherName) {
      mother = findParents(people, person.motherName);
    }

    return { ...person, mother, father };
  });

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
        {peopleWithParents.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
