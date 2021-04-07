import React from 'react';
import { PersonRow } from './PersonRow';
import { Person } from './Types';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="peopleTable">
    <thead>
      <tr>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>motherName</th>
        <th>fatherName</th>
      </tr>
    </thead>
    <tbody>
      {people.length && people.map((person: Person) => (
        <PersonRow
          key={person.slug}
          person={person}
        />
      ))}
    </tbody>
  </table>
);
