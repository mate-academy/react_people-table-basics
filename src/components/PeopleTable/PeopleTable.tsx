import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person [],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <tr>
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
    </tr>

    <tbody>
      {people.map((person) => <PersonRow person={person} />)}
    </tbody>
  </table>
);
