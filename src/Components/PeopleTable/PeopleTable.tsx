import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';

import './PeopleTable.scss';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <table className="PeopleTable table table-striped">
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
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
});
