import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  persons: Person[];
};

export const PersonsList: React.FC<Props> = ({ persons }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
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
        {persons.map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
