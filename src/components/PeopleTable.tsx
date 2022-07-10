import React from 'react';
import { PersonRow } from './PersonRow';

interface Props {
  people: People[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table is-bordered">
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
        <tr
          key={person.slug}
        >
          <PersonRow person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);
