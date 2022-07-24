import React from 'react';
import { PersonRow } from './PeopleRows';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table">
    <thead>
      <th>Name</th>
      <th>Sex</th>
      <th>Born</th>
      <th>Died</th>
      <th>Mother</th>
      <th>Father</th>
    </thead>
    <tbody>
      {
        people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))
      }
    </tbody>
  </table>
);
