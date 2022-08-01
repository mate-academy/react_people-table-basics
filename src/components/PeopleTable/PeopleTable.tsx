import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="PeopleTable table">
    <th>Name</th>
    <th>Sex</th>
    <th>Born</th>
    <th>Died</th>
    <th>Mother</th>
    <th>Father</th>

    <tbody>
      {people.map(person => (
        <PersonRow key={person.name} person={person} />
      ))}
    </tbody>
  </table>
);
