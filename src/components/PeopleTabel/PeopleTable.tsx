import React from 'react';
import { Person } from '../../type/person';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="
          table
          is-bordered
          is-striped
          is-narrow"
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
          <PersonRow person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
