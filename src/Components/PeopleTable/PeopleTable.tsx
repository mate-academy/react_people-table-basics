import React from 'react';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

interface Props {
  people: PeopleWithParrents[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="people-table"
      cellPadding="10"
      width="100%"
    >
      <thead
        className="people-table-head"
      >
        <tr
          className="people-table-row"
        >
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>

      <tbody>
        <PersonRow people={people} />
      </tbody>
    </table>
  );
};
