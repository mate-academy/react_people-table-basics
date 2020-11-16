import React from 'react';
import { People } from '../helpers/interfaces';
import { PersonRow } from './PersonRow';

type PeopleTableProps = {
  people: People[],
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>MotherName</th>
          <th>FatherName</th>
        </tr>
      </thead>
      <tbody>
      {people.map((person: People) => (
        <PersonRow
          person={person}
          key={person.slug}
        />
      ))}
      </tbody>
    </table>
  )
}
