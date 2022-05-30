import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Sex</th>
          <th className="table-header">Born</th>
          <th className="table-header">Died</th>
          <th className="table-header">Mother</th>
          <th className="table-header">Father</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {people.map((person) => (
          <PersonRow
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
