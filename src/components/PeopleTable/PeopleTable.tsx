import React from 'react';
import { Person } from '../../react-app-env';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}

export const PeopleTable:React.FC<Props> = ({ people }) => (
  <table
    className="
    table is-bordered
    is-striped is-hoverable"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
