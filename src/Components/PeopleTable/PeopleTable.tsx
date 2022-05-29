import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow/PersonRow';

interface PersonWithParents extends Person {
  father?: Person,
  mother?: Person,
}

interface Props {
  people: PersonWithParents[],
}

export const PeopleTable:React.FC<Props> = ({ people }) => (
  <table className="people-table table is-fullwidth is-bordered">
    <thead className="people-table__head">
      <tr className="people-table__row is-selected">
        <th className="people-table__cell">name</th>
        <th className="people-table__cell">sex</th>
        <th className="people-table__cell">born</th>
        <th className="people-table__cell">died</th>
        <th className="people-table__cell">mother</th>
        <th className="people-table__cell">father</th>
      </tr>
    </thead>
    <tbody className="people-table__body">
      { people.map((person, i) => (
        <PersonRow
          person={person}
          key={person.slug + String(i)}
        />
      ))}
    </tbody>
  </table>
);
