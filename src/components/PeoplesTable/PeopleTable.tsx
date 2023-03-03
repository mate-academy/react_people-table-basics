import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[]
  selectedSlug:string,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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

      {people.map(person => (
        <PersonInfo
          key={person.slug}
          person={person}
          selectedSlug={selectedSlug}
        />
      ))}
    </tbody>
  </table>
);
