import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable">
      <tbody>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
        <PersonRow people={people} />
      </tbody>
    </table>
  );
};
