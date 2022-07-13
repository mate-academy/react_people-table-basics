import React from 'react';
import { Person } from '../react-app-env';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    className="table is-bordered is-striped is-fullwidth"
    style={{ borderCollapse: 'collapse' }}
  >
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} />
      ))}
    </tbody>
  </table>
);
