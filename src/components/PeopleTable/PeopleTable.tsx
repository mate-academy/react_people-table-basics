import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <h1>People table</h1>
      <table
        className="peopleTable"
        style={{ borderCollapse: 'collapse' }}
      >
        <tbody className="peopleTable__listRow">
          <tr className="peopleTable__head">
            <th className="peopleTable__name">Name</th>
            <th className="peopleTable__name">Sex</th>
            <th className="peopleTable__name">Born</th>
            <th className="peopleTable__name">Died</th>
            <th className="peopleTable__name">Mother</th>
            <th className="peopleTable__name">Father</th>
          </tr>
        </tbody>
        {people.map(person => (
          <PersonRow
            key={person.name}
            person={person}
          />
        ))}
      </table>
    </>
  );
};
