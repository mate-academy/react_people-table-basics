import React from 'react';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({ people }) => {
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
          <PersonRow
            key={person.slug}
            person={person}
            motherIs={people.find(
              human => human.name === person.motherName,
            ) || null}
            fatherIs={people.find(
              human => human.name === person.fatherName,
            ) || null}
          />
        ))}
      </tbody>
    </table>
  );
};
