import React from 'react';
import { Person } from '../../types';
import { PeopleItem } from '../PeopleItem';

type Props = {
  people: Person[];
  personId: string;
};

export const PeopleList: React.FC<Props> = ({ people, personId }) => (
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
        <PeopleItem
          people={people}
          person={person}
          personId={personId}
          key={person.slug}
        />
      ))}
    </tbody>
  </table>
);
