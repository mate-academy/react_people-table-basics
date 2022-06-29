import React from 'react';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table-hover">
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
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
