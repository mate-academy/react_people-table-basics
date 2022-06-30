import React from 'react';
import { PersonRow } from '../PersonRow';

interface Props {
  people: PeopleParrents[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    // eslint-disable-next-line max-len
    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
        <PersonRow people={people} />
      </tbody>
    </table>

  );
};
