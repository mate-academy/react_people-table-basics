import React from 'react';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    className="table"
    style={{
      borderCollapse: 'collapse',
    }}
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
        <tr key={person.name}>
          <PersonRow person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);
