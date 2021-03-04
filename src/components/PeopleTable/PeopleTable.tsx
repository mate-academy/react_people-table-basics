import React from 'react';
import { Person } from '../../interfaces';
import { PeopleRow } from '../PeopleRow';

interface PeopleProps {
  people: Person[],
}

export const PeopleTable: React.FC<PeopleProps> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person: Person) => (
          <PeopleRow person={person} />
        ))}
      </tbody>
    </table>
  )
}