import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: PersonWithParents[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
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
