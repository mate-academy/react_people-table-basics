import React from 'react';
// Components
import { PersonRow } from '../PersonRow/PersonRow';
// Types
import { Person } from '../../types/Person/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        <th className="PeopleTable__Title">Name</th>
        <th className="PeopleTable__Title">Sex</th>
        <th className="PeopleTable__Title">Born</th>
        <th className="PeopleTable__Title">Died</th>
        <th className="PeopleTable__Title">Mother</th>
        <th className="PeopleTable__Title">Father</th>
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
