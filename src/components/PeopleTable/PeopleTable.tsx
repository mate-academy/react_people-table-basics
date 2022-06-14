import React from 'react';
import './PeopleTable.scss';

import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable:React.FC<Props> = ({ people }) => (

  <table className="peopleTable">
    <thead>
      <tr className="peopleTable__header">
        <th className="peopleTable__cell">Name</th>
        <th className="peopleTable__cell">Sex</th>
        <th className="peopleTable__cell">Born</th>
        <th className="peopleTable__cell">Died</th>
        <th className="peopleTable__cell">Mother</th>
        <th className="peopleTable__cell">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <tr key={person.slug} className="peopleTable__row">
          <PersonRow person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);
