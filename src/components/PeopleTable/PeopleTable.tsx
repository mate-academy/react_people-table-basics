import React from 'react';
import { Person } from '../../types/Person';
import { PersonRow } from '../PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
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
        {people.map(person => <PersonRow key={person.slug} person={person} />)}
      </tbody>
    </table>
  );
});
