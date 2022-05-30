import React from 'react';
import { PeopleParents } from '../../types/types';
import { PersonRow } from '../PersonRow';

type Props = {
  peoples: PeopleParents[] | null;
};

export const PeopleTable: React.FC<Props> = ({
  peoples,
}) => {
  return (
    <table>
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
      {peoples && (
        <tbody>
          {peoples.map(people => (
            <PersonRow
              person={people}
              key={people.name}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};
