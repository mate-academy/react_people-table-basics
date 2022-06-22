import React from 'react';
import { PersonRow } from '../PersonRow';

type Props = {
  people: PersonWithParents[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>father</th>
          <th>mother</th>
        </tr>
      </thead>
      <tbody>
        <PersonRow people={people} />
      </tbody>
    </table>
  );
};
