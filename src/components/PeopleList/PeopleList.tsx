import React from 'react';
import { Person } from '../../types';
import { People } from '../People';

type Props = {
  persons: Person[],
};

export const PeopleList: React.FC<Props> = ({ persons }) => (
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
        <People key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
