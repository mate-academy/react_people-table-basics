import React from 'react';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  people: Person[]
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people.map(person => (
          <PersonLink key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
