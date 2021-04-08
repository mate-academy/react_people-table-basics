import React from 'react';
import { PerosonRow } from './PersonRow';

export const PeopleTable = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Sex
          </th>
          <th>
            Born
          </th>
          <th>
            Died
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PerosonRow
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
