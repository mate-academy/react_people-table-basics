import React from 'react';
import { People } from '../../types/People';
import { PersonRow } from '../PersonRow/PersonRow';

import 'bulma';

export type Props = {
  people: People[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="PeopleTable table is-bordered is-hoverable">
      <thead>
        <tr className="table-row">
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
