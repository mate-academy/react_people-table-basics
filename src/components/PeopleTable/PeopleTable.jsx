import React from 'react';

import './PeopleTable.scss'

import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => {
  return (
    <table className="PeopleTable">
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
      {people.map(person => (
        <tbody key={person.slug}>
          <PersonRow
            className="Person"
            {...person}
          />
        </tbody>
      ))}
    </table>
  );
};
