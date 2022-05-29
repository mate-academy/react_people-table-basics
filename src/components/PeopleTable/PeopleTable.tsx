import React from 'react';
import { PersonWithParents } from '../../types/Person';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  people: PersonWithParents[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="people-table">
    <thead className="people-table__head">
      <tr className="people-table__row">
        <th className="people-table__cell">name</th>
        <th className="people-table__cell">sex</th>
        <th className="people-table__cell">born</th>
        <th className="people-table__cell">died</th>
        <th className="people-table__cell">mother</th>
        <th className="people-table__cell">father</th>
      </tr>
    </thead>
    <tbody>
      {
        people.map((person, index) => (
          <PersonRow
            person={person}
            key={person.slug + String(index)}
          />
        ))
      }
    </tbody>
  </table>
);
