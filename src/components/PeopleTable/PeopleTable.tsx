import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="table PeopleTable"
    >
      <thead>
        <tr className="columnTable">
          <th className="title is-3">Name</th>
          <th className="title is-3">Sex</th>
          <th className="title is-3">Born</th>
          <th className="title is-3">Died</th>
          <th className="title is-3">Mother</th>
          <th className="title is-3">Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <PersonRow person={person} />
        ))}
      </tbody>
    </table>
  );
};
