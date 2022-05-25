import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <>
    <h1>People table</h1>
    <table className="table">
      <tbody>
        <tr>
          <th className="table__item">Name</th>
          <th className="table__item">Sex</th>
          <th className="table__item">Born</th>
          <th className="table__item">Died</th>
          <th className="table__item">Mother</th>
          <th className="table__item">Father</th>
        </tr>
      </tbody>
      {people.map(person => (
        <PersonRow
          key={person.slug}
          person={person}
        />
      ))}
    </table>
  </>
);
