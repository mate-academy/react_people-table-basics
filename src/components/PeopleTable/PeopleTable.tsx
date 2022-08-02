import React from 'react';
import { PersonRow } from '../PersonRow';

interface Props {
  people: People[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>

    <tbody>
      {
        people.map(person => (
          <PersonRow people={person} key={person.name} />
        ))
      }

    </tbody>
  </table>
);
